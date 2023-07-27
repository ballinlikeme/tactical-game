import { Cell } from "../../Cell";
import { Unit } from "../../units/Unit";
import { ActionStrategy } from "../Strategy";

export class DamageStrategy implements ActionStrategy {
    performAction(unit: Unit, target: Cell): void {
        if (target.unit && target.availiable) {
            target.unit.takeDamage(unit.power);
        }
    }
}
