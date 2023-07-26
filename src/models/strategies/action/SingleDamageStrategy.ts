import { SingleActionStrategy } from "../Strategy";
import { Unit } from "../../units/Unit";
import { Cell } from "../../Cell";
import { StrategiesType } from "../../enums";

export class SingleDamageStrategy implements SingleActionStrategy {
    type = StrategiesType.SINGLE as const;

    performAction(unit: Unit, target: Cell): void {
        if (target.availiable && target.unit) {
            target.unit.healthPoints = target.unit.isDefending
                ? Math.floor(target.unit.healthPoints - unit.power / 2)
                : target.unit.healthPoints - unit.power;
            if (target.unit.healthPoints <= 0) {
                target.unit.healthPoints = 0;
                target.unit.isDead = true;
            }
        }
    }
}
