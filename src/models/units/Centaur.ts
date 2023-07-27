import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { NeighborEnemyStrategy } from "../strategies/target/NeighborEnemyStrategy";
import { DamageStrategy } from "../strategies/action/DamageStrategy";
import { SingleTargetStrategy } from "../strategies/Range";
import image from "../../assets/centaur.jpg";

export class Centaur extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 150;
        this.maxHealthPoints = 150;
        this.power = 50;
        this.initiative = 50;
        this.name = UnitNames.CENTAUR;
        this.image = image;
        this.targetStrategy = new NeighborEnemyStrategy();
        this.rangeStrategy = new SingleTargetStrategy();
        this.actionStrategy = new DamageStrategy();
    }
}
