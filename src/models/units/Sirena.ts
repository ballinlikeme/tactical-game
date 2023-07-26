import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { SingleParalyzeStrategy } from "../strategies/action/SingleParalyzeStrategy";
import { MassEnemyStrategy } from "../strategies/target/MassEnemyStrategy";
import image from "../../assets/sirena.jpg";

export class Sirena extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 130;
        this.maxHealthPoints = 130;
        this.initiative = 20;
        this.name = UnitNames.SIRENA;
        this.image = image;
        this.power = 0;
        this.targetStrategy = new MassEnemyStrategy();
        this.actionStrategy = new SingleParalyzeStrategy();
    }
}
