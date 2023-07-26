import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { MassEnemyStrategy } from "../strategies/target/MassEnemyStrategy";
import { MassDamageStrategy } from "../strategies/action/MassDamageStrategy";
import image from "../../assets/skeleton_mage.png";

export class SkeletonMage extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 50;
        this.maxHealthPoints = 50;
        this.power = 20;
        this.initiative = 40;
        this.name = UnitNames.SKELETON_MAGE;
        this.image = image;
        this.targetStrategy = new MassEnemyStrategy();
        this.actionStrategy = new MassDamageStrategy();
    }
}
