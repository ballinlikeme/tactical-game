import { Cell } from "./Cell";
import { Archimage } from "./units/Archimage";
import { Bandit } from "./units/Bandit";
import { ElfArcher } from "./units/ElfArcher";
import { Monk } from "./units/Monk";
import { Sirena } from "./units/Sirena";
import { Skeleton } from "./units/Skeleton";
import { SkeletonMage } from "./units/SkeletonMage";

export class Board {
    cells: Cell[][] = [];


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
        new Archimage({ cell: this.getCell(0, 0), playerId: 1 });
        new SkeletonMage({ cell: this.getCell(1, 0), playerId: 1 });
        new Sirena({ cell: this.getCell(2, 0), playerId: 1 });
        new Skeleton({ cell: this.getCell(0, 1), playerId: 1 });
        new Skeleton({ cell: this.getCell(1, 1), playerId: 1 });
        new Monk({ cell: this.getCell(2, 1), playerId: 1 });
        new Skeleton({ cell: this.getCell(0, 2), playerId: 0 })
        new Monk({ cell: this.getCell(1, 2), playerId: 0 });
        new Bandit({ cell: this.getCell(2, 2), playerId: 0 });
        new Archimage({ cell: this.getCell(0, 3), playerId: 0 });
        new ElfArcher({ cell: this.getCell(1, 3), playerId: 0 });
        new Archimage({ cell: this.getCell(2, 3), playerId: 0 });

    }

    public hightlightCells(selectedCell: Cell | null): void {
        for (let i = 0; i < 4; i++) {
            const row = this.cells[i];
            if (row) {
                for (let j = 0; j < row.length; j++) {
                    const target = row[j];
                    target.availiable = !!selectedCell?.unit?.canInteractWith(target)
                }
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells;
        return newBoard;
    }
}