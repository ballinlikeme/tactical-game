import { Cell } from "../../Cell";
import { StrategiesType } from "../../enums";
import { Unit } from "../../units/Unit";
import { SingleActionStrategy } from "../Strategy";

export class SingleHealStrategy implements SingleActionStrategy {
    type = StrategiesType.SINGLE as const;

    performAction(unit: Unit, target: Cell): void {
        if (target.availiable && target.unit) {
            target.unit.healthPoints += unit.power;
            if (target.unit.healthPoints > target.unit.maxHealthPoints) {
                target.unit.healthPoints = target.unit.maxHealthPoints;
            }
        }
    }
}
