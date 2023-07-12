import { BaseUnit, BaseUnitProps } from ".";
import { Cell } from "..";
import { HealType, UnitType } from "../enums";

export interface HealUnitProps extends Omit<BaseUnitProps, "type"> {}

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
            if (
                this.playerId === target.unit?.playerId &&
                this.cell.id !== target.id &&
                !target.unit.isDead
            ) {
                return true;
            }
        }
        return false;
    }

    interactWith(target: Cell): void {}
}
