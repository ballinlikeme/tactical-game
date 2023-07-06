import { MeleeUnit, DamageUnitProps } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/skeleton.png"

export class Skeleton extends MeleeUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 100;
        this.maxHealthPoints = 100;
        this.damage = 25;
        this.initiative = 50;
        this.name = UnitNames.SKELETON
        this.image = image;
    }
}