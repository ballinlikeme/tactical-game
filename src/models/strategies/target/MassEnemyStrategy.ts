import { Cell } from "../..";
import { Unit } from "../../units/Unit";
import { HighlightStrategy } from "../Strategy";

export class MassEnemyStrategy implements HighlightStrategy {
    highlightCells(unit: Unit, cells: Cell[][]): void {
        cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((target) => {
                if (
                    target.unit &&
                    !target.unit.isDead &&
                    unit.playerId !== target.unit.playerId
                ) {
                    target.availiable = true;
                }
            });
    }
}
