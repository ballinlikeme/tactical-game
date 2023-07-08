import { BaseUnit, BaseUnitProps } from "."
import { Cell } from "..";
import { UnitType } from "../enums";

export interface ParalyzerUnitProps extends Omit<BaseUnitProps, 'type'> {

}

export class ParalyzerUnit extends BaseUnit {

    type: UnitType = UnitType.PARALYZER;

    constructor(props: ParalyzerUnitProps) {
        super(props);
    }

    interactWith(target: Cell): void {
        target.unit!.isParalyzed = true;
    }
}