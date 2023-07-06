import { ParalyzerUnit, ParalyzerUnitProps } from "../base";
import { UnitNames } from "../enums";
import image from "../../assets/sirena.jpg"

export class Sirena extends ParalyzerUnit {
    constructor(props: ParalyzerUnitProps) {
        super(props);
        this.healthPoints = 130;
        this.maxHealthPoints = 130;
        this.initiative = 20;
        this.name = UnitNames.SIRENA
        this.image = image;
    }
}