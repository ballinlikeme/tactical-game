import { Cell } from "../Cell";
import { UnitType, UnitNames } from "../enums"

export interface BaseUnitProps {
    cell: Cell;
    playerId: number;
}

export class BaseUnit {
    type: UnitType;
    name: UnitNames;
    initiative: number;
    healthPoints: number;
    isDead: boolean;
    isDefending: boolean = false;
    isParalyzed: boolean = false;
    cell: Cell;
    playerId: number;
    image: string = '';
    id: number;
    maxHealthPoints: number;

    constructor(props: BaseUnitProps) {
        this.type = UnitType.UNIT;
        this.name = UnitNames.UNIT;
        this.initiative = 0;
        this.healthPoints = 0;
        this.isDead = false;
        this.cell = props.cell;
        this.cell.unit = this;
        this.playerId = props.playerId;
        this.id = Math.random()
        this.maxHealthPoints = 0;
    }

    canInteractWith(target: Cell): boolean {
        if (this.type !== UnitType.HEALER && !target.unit?.isDead) {
            if (target.unit?.playerId === this.playerId) {
                return false;
            }
        }
        return true;
    }

    interactWith(target: Cell): void { }

}