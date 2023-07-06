import { DamageUnitProps, RangeUnit } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/bandit.png"

export class Bandit extends RangeUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 75;
        this.maxHealthPoints = 75;
        this.damage = 30;
        this.initiative = 60;
        this.name = UnitNames.BANDIT
        this.image = image;
    }
}