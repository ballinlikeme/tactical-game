import { UnitNames } from "../enums";
import { MassEnemyStrategy } from "../strategies/target/MassEnemyStrategy";
import { Unit, UnitProps } from "./Unit";
import { DamageStrategy } from "../strategies/action/DamageStrategy";
import { MassTargetStrategy } from "../strategies/Range";
import image from "../../assets/archimage.png";

export class Archimage extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.power = 30;
        this.initiative = 40;
        this.name = UnitNames.ARCHIMAGE;
        this.image = image;
        this.targetStrategy = new MassEnemyStrategy();
        this.actionStrategy = new DamageStrategy();
        this.rangeStrategy = new MassTargetStrategy();
    }
}
