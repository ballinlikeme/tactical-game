import { UnitNames } from "../enums";
import { Unit, UnitProps } from "./Unit";
import { MassEnemyStrategy } from "../strategies/target/MassEnemyStrategy";
import image from "../../assets/bandit.png";

export class Bandit extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 75;
        this.maxHealthPoints = 75;
        this.power = 30;
        this.initiative = 60;
        this.name = UnitNames.BANDIT;
        this.image = image;
        this.targetStrategy = new MassEnemyStrategy();
    }
}
