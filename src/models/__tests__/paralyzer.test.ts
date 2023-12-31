import { Board } from "../Board";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
    board.queue.reset();
});

describe("paralyzer unit", () => {
    test("if can attack enemy units", () => {
        const sirenaCell = board.cells[1][1];
        const elfArcherCell = board.cells[2][0];

        sirenaCell.unit?.highlightCells();
        sirenaCell.unit?.performAction(elfArcherCell);

        expect(elfArcherCell.unit?.isParalyzed).toBe(true);
    });

    test("if select targets correcly", () => {
        const sirenaCell = board.cells[1][1];

        if (sirenaCell.unit) {
            sirenaCell.unit.highlightCells();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) => cell.unit?.playerId !== sirenaCell.unit?.playerId
                )
                .forEach((cell) => expect(cell.availiable).toBe(true));
        }
    });
});
