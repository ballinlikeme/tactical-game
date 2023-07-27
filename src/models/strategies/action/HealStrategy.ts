import { Cell } from "../../Cell";
import { Unit } from "../../units/Unit";
import { ActionStrategy } from "../Strategy";

export class HealStrategy implements ActionStrategy {
    performAction(unit: Unit, target: Cell): void {
        if (target.unit && target.availiable) {
            target.unit.heal(unit.power);
        }
    }
}
