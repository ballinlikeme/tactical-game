import { Queue } from "./Queue";
import { Cell } from "./Cell";
import { Archimage } from "./units/Archimage";
import { Bandit } from "./units/Bandit";
import { ElfArcher } from "./units/ElfArcher";
import { Monk } from "./units/Monk";
import { Sirena } from "./units/Sirena";
import { Skeleton } from "./units/Skeleton";
import { SkeletonMage } from "./units/SkeletonMage";
import { Bishop } from "./units/Bishop";
import { Centaur } from "./units/Centaur";

const units = [
    Archimage,
    Bandit,
    ElfArcher,
    Sirena,
    Monk,
    Skeleton,
    SkeletonMage,
    Bishop,
    Centaur,
];

function arrayRandElement<T>(arr: T[]): T {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

export class Board {
    cells: Cell[][] = [];
    queue: Queue = new Queue(this.cells);

    public initCells(): void {
        for (let i = 0; i < 4; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 3; j++) {
                row.push(new Cell(this, j, i, null));
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x];
    }

    public setUpUnits(): void {
        this.cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((cell) => {
                const playerId = cell.y <= 1 ? 1 : 0;
                const Unit = arrayRandElement<typeof Sirena>(units);
                new Unit({ cell, playerId });
            });
    }

    public hightlightCells(selectedCell: Cell | null): void {
        for (let i = 0; i < 4; i++) {
            const row = this.cells[i];
            if (row) {
                for (let j = 0; j < row.length; j++) {
                    const target = row[j];
                    target.availiable =
                        !!selectedCell?.unit?.canInteractWith(target);
                }
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.queue = this.queue;
        return newBoard;
    }
}
