import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { NeighborEnemyStrategy } from "../strategies/target/NeighborEnemyStrategy";
import image from "../../assets/skeleton.webp";

export class Skeleton extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 100;
        this.maxHealthPoints = 100;
        this.power = 25;
        this.initiative = 50;
        this.name = UnitNames.SKELETON;
        this.image = image;
        this.targetStrategy = new NeighborEnemyStrategy();
    }
}
