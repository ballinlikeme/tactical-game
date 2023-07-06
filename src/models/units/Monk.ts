import { HealUnit, HealUnitProps } from "../base";
import { HealType, UnitNames } from "../enums";
import image from "../../assets/monk.png"

export class Monk extends HealUnit {
    constructor(props: HealUnitProps) {
        super(props);
        this.healType = HealType.SINGLE;
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.heal = 40;
        this.initiative = 20;
        this.name = UnitNames.MONK
        this.image = image;
    }
}