import { MageUnit, DamageUnitProps } from "../base"
import { UnitNames } from "../enums";
import image from "../../assets/skeleton_mage.png"

export class SkeletonMage extends MageUnit {
    constructor(props: DamageUnitProps) {
        super(props);
        this.healthPoints = 50;
        this.maxHealthPoints = 50;
        this.damage = 20;
        this.initiative = 40;
        this.name = UnitNames.SKELETON_MAGE;
        this.image = image;
    }
}