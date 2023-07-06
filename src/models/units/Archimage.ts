import { MageUnit, DamageUnitProps } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/archimage.png"

export class Archimage extends MageUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.damage = 30;
        this.initiative = 40;
        this.name = UnitNames.ARCHIMAGE;
        this.image = image;
    }
}