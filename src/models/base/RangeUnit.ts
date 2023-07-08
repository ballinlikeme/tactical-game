import { DamageUnit } from "./DamageUnit";
import { UnitType } from "../enums";
import type { DamageUnitProps } from "./DamageUnit";
import { Cell } from "..";

export class RangeUnit extends DamageUnit {
    type: UnitType = UnitType.RANGE

    constructor(props: DamageUnitProps) {
        super(props);
    }

    interactWith(target: Cell): void {
        super.interactWith(target);
    }
}