import { Board } from "../Board";
import { ParalyzerUnit } from "../base";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe('paralyzer unit', () => {

    test('if can attack enemy units', () => {
        const sirenaCell = board.cells[1][1];
        const elfArcherCell = board.cells[2][0];

        board.hightlightCells(sirenaCell);

        if (sirenaCell instanceof ParalyzerUnit) {
            sirenaCell.interactWith(elfArcherCell);

            expect(elfArcherCell.unit?.isParalyzed).toBe(true);
        }
    })

    test('if select targets correcly', () => {
        const sirenaCell = board.cells[1][1];

        board.hightlightCells(sirenaCell);

        board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .filter((cell) => cell.unit?.playerId !== sirenaCell.unit?.playerId)
            .forEach((cell) => expect(cell.availiable).toBe(true))
    })
})