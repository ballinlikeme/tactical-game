import { MeleeUnit, DamageUnitProps } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/centaur.jpg"

export class Centaur extends MeleeUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 150;
        this.maxHealthPoints = 150;
        this.damage = 50;
        this.initiative = 50;
        this.name = UnitNames.CENTAUR
        this.image = image;
    }
}