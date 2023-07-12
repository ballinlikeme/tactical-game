import { HealUnitProps } from "../base";
import { SingleHealUnit } from "../base/SingleHealUnit";
import { UnitNames } from "../enums";
import image from "../../assets/monk.png";

export class Monk extends SingleHealUnit {
    constructor(props: HealUnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.heal = 40;
        this.initiative = 20;
        this.name = UnitNames.MONK;
        this.image = image;
    }
}
