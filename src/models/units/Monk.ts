import { Unit, UnitProps } from "./Unit";
import { UnitNames } from "../enums";
import { MassFriendStrategy } from "../strategies/target/MassFriendStrategy";
import { SingleHealStrategy } from "../strategies/action/SingleHealStrategy";
import image from "../../assets/monk.png";

export class Monk extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 90;
        this.maxHealthPoints = 90;
        this.power = 40;
        this.initiative = 20;
        this.name = UnitNames.MONK;
        this.image = image;
        this.targetStrategy = new MassFriendStrategy();
        this.actionStrategy = new SingleHealStrategy();
    }
}
