import { HighlightStrategy } from "../Strategy";
import { Cell } from "../../Cell";
import { Unit } from "../../units/Unit";

export class NeighborEnemyStrategy implements HighlightStrategy {
    highlightCells(unit: Unit, cells: Cell[][]): void {
        cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((target) => {
                const currentY = unit.cell.y;

                if (unit.playerId === 0) {
                    for (let i = currentY - 1; i >= 0; i--) {
                        const line = unit.cell.board.cells[i];
                        const unitInLine = line[0].unit;
                        const cantInteract =
                            unit.playerId !== unitInLine?.playerId;
                        if (cantInteract) {
                            const aliveUnits = line.filter(
                                (cell) => !cell.unit?.isDead
                            );
                            if (aliveUnits.length) {
                                const currentX = unit.cell.x;
                                const nearestEnemy = aliveUnits.filter(
                                    (cell) => Math.abs(cell.x - currentX) <= 1
                                );
                                if (nearestEnemy.length > 0) {
                                    if (nearestEnemy.includes(target)) {
                                        return (target.availiable = true);
                                    }
                                } else if (aliveUnits.includes(target))
                                    return (target.availiable = true);
                                return (target.availiable = false);
                            } else {
                                continue;
                            }
                        } else {
                            const aliveUnits = line.filter(
                                (cell) => !cell.unit?.isDead
                            );
                            if (aliveUnits.length)
                                return (target.availiable = false);
                            continue;
                        }
                    }
                }

                if (unit.playerId === 1) {
                    for (let i = currentY + 1; i <= 3; i++) {
                        const line = unit.cell.board.cells[i];
                        const unitInLine = line[0].unit;
                        const cantInteract =
                            unit.playerId !== unitInLine?.playerId;
                        if (cantInteract) {
                            const aliveUnits = line.filter(
                                (cell) => !cell.unit?.isDead
                            );
                            if (aliveUnits.length) {
                                const currentX = unit.cell.x;
                                const nearestEnemy = aliveUnits.filter(
                                    (cell) => Math.abs(cell.x - currentX) <= 1
                                );
                                if (nearestEnemy.length > 0) {
                                    if (nearestEnemy.includes(target)) {
                                        return (target.availiable = true);
                                    }
                                } else if (aliveUnits.includes(target))
                                    return (target.availiable = true);
                                return (target.availiable = false);
                            } else {
                                continue;
                            }
                        } else {
                            const aliveUnits = line.filter(
                                (cell) => !cell.unit?.isDead
                            );
                            if (aliveUnits.length)
                                return (target.availiable = false);
                            continue;
                        }
                    }
                }
            });
    }
}
