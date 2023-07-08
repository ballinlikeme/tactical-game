import { DamageUnit } from "./DamageUnit";
import { UnitType } from "../enums";
import type { DamageUnitProps } from "./DamageUnit";
import { Cell } from "..";

export class MageUnit extends DamageUnit {
    type: UnitType = UnitType.MAGE

    constructor(props: DamageUnitProps) {
        super(props);
    }


    interactWith(target: Cell): void {
        super.interactWith(target);
    }
}