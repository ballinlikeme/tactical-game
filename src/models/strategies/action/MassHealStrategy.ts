import { Cell } from "../../Cell";
import { StrategiesType } from "../../enums";
import { Unit } from "../../units/Unit";
import { MassActionStrategy } from "../Strategy";

export class MassHealStrategy implements MassActionStrategy {
    type: StrategiesType.MASS = StrategiesType.MASS;

    performAction(unit: Unit, cells: Cell[][]): void {
        cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((cell) => {
                if (cell.availiable && cell.unit) {
                    cell.unit.healthPoints += unit.power;
                    if (cell.unit.healthPoints > cell.unit.maxHealthPoints) {
                        cell.unit.healthPoints = cell.unit.maxHealthPoints;
                    }
                }
            });
    }
}
