import { UnitNames } from "../enums";
import { Unit, UnitProps } from "./Unit";
import { MassFriendStrategy } from "../strategies/target/MassFriendStrategy";
import { HealStrategy } from "../strategies/action/HealStrategy";
import { MassTargetStrategy } from "../strategies/Range";
import image from "../../assets/bishop.jpg";

export class Bishop extends Unit {
    constructor(props: UnitProps) {
        super(props);
        this.healthPoints = 130;
        this.maxHealthPoints = 130;
        this.power = 25;
        this.initiative = 20;
        this.name = UnitNames.BISHOP;
        this.image = image;
        this.targetStrategy = new MassFriendStrategy();
        this.actionStrategy = new HealStrategy();
        this.rangeStrategy = new MassTargetStrategy();
    }
}
