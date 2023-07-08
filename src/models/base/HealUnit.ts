import { BaseUnit, BaseUnitProps } from ".";
import { Cell } from "..";
import { HealType, UnitType } from "../enums";

export interface HealUnitProps extends Omit<BaseUnitProps, 'type'> {
}

export class HealUnit extends BaseUnit {
    type: UnitType = UnitType.HEALER;
    healType: HealType;
    heal: number;

    constructor(props: HealUnitProps) {
        super(props);
        this.healType = HealType.HEAL;
        this.heal = 0;
    }

    canInteractWith(target: Cell): boolean {
        if (super.canInteractWith(target)) {
            if (this.playerId === target.unit?.playerId && this.cell.id !== target.id) {
                return true;
            }
        }
        return false;
    }

    interactWith(target: Cell): void {
        if (this.healType === HealType.SINGLE) {
            if (target.availiable && target.unit && !target.unit.isDead) {
                if (target.unit.healthPoints + this.heal > target.unit.maxHealthPoints) {
                    target.unit.healthPoints = target.unit.maxHealthPoints
                } else {
                    target.unit.healthPoints += this.heal;
                }
            }
        }
        if (this.healType === HealType.MASS) {
            this.cell.board.cells.forEach((row) => {
                const isAllyRow = row[0].unit?.playerId === this.playerId
                if (isAllyRow) {
                    row.forEach(cell => cell.unit!.healthPoints += this.heal)
                }
            })
        }
    }
}