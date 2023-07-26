import { Cell } from "../../Cell";
import { StrategiesType } from "../../enums";
import { Unit } from "../../units/Unit";
import { MassActionStrategy } from "../Strategy";

export class MassDamageStrategy implements MassActionStrategy {
    type = StrategiesType.MASS as const;

    performAction(unit: Unit, cells: Cell[][]): void {
        cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((cell) => {
                if (cell.availiable && cell.unit) {
                    cell.unit.healthPoints = cell.unit.isDefending
                        ? cell.unit.healthPoints - unit.power / 2
                        : cell.unit.healthPoints - unit.power;
                    if (cell.unit.healthPoints <= 0) {
                        cell.unit.healthPoints = 0;
                        cell.unit.isDead = true;
                    }
                }
            });
    }
}
