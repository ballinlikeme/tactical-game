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

// export class Queue {
//     private _board: Board;
//     private _paralyzedNextRound: Cell[] = [];
//     currentQueue: Cell[] = [];

//     constructor(board: Board) {
//         this._board = board;
//     }

//     reset(): void {
//         this._paralyzedNextRound = [];
//         this.currentQueue = this._board.cells
//             .reduce((prev, curr) => prev.concat(curr))
//             .filter((cell) => !this._paralyzedNextRound.includes(cell));
//         this.formatQueue();
//     }

//     formatQueue(): void {
//         this.currentQueue = this.currentQueue
//             .filter((cell) => !cell.unit?.isDead && !cell.unit?.isParalyzed)
//             .sort((a, b) => b.unit!.initiative - a.unit!.initiative);
//     }

//     updateQueue(): void {
//         this.currentQueue = this.currentQueue.slice(1);
//         this.formatQueue();
//     }

//     addToParalyzedNextRound(cell: Cell): void {
//         this._paralyzedNextRound.push(cell);
//     }
// }
