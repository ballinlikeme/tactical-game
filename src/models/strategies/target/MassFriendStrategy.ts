import { Cell } from "../..";
import { Unit } from "../../units/Unit";
import { HighlightStrategy } from "../Strategy";

export class MassFriendStrategy implements HighlightStrategy {
    highlightCells(unit: Unit, cells: Cell[][]): void {
        cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((target) => {
                if (
                    target.unit?.playerId === unit.playerId &&
                    target.unit.id !== unit.id
                )
                    target.availiable = true;
            });
    }
}
