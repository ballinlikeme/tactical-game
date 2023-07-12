import { Cell } from "./Cell";

export class Queue {
    currentQueue: Cell[] = [];
    cells: Cell[][];
    paralyzedInNextRound: Cell[] = [];

    constructor(cells: Cell[][]) {
        this.cells = cells;
    }

    reset(): void {
        const allCells = this.cells.reduce((prev, curr) => prev.concat(curr));
        allCells.forEach((cell) => {
            if (cell.unit) {
                cell.unit.isParalyzed = false;
                cell.unit.isDefending = false;
            }
        });
        this.paralyzedInNextRound.forEach((cell) => {
            if (cell.unit) {
                cell.unit.isParalyzed = true;
            }
        });
        this.paralyzedInNextRound = [];
        this.currentQueue = allCells;
        this.formatQueue();
    }

    formatQueue(): void {
        this.currentQueue = this.currentQueue
            .filter(
                (cell) =>
                    !cell.unit?.isDead &&
                    !cell.unit?.isParalyzed &&
                    !this.paralyzedInNextRound.includes(cell)
            )
            .sort((a, b) => {
                if (a.unit && b.unit) {
                    return b.unit.initiative - a.unit.initiative;
                }
                return 0;
            });
    }

    updateQueue(): void {
        this.currentQueue = this.currentQueue.slice(1);
        this.formatQueue();
    }

    addToParalyzedInNextRound(target: Cell): void {
        this.paralyzedInNextRound.push(target);
    }
}
