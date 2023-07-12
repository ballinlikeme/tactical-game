import { HealUnitProps } from "../base";
import { UnitNames } from "../enums";
import { MassHealUnit } from "../base/MassHealUnit";
import image from "../../assets/bishop.jpg";

export class Bishop extends MassHealUnit {
    constructor(props: HealUnitProps) {
        super(props);
        this.healthPoints = 130;
        this.maxHealthPoints = 130;
        this.heal = 25;
        this.initiative = 20;
        this.name = UnitNames.BISHOP;
        this.image = image;
    }
}
