import { DamageUnit } from "./DamageUnit";
import { UnitType } from "../enums";
import type { DamageUnitProps } from "./DamageUnit";

export class RangeUnit extends DamageUnit {
    type: UnitType = UnitType.RANGE

    constructor(props: DamageUnitProps) {
        super(props);
    }
}