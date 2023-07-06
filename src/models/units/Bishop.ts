import { HealUnit, HealUnitProps } from "../base";
import { HealType, UnitNames } from "../enums";
import image from "../../assets/bishop.jpg"

export class Bishop extends HealUnit {
    constructor(props: HealUnitProps) {
        super(props);
        this.healType = HealType.MASS;
        this.healthPoints = 130;
        this.maxHealthPoints = 130;
        this.heal = 25;
        this.initiative = 20;
        this.name = UnitNames.BISHOP
        this.image = image;
    }
}