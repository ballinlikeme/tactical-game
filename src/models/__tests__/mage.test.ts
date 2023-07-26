import { Board } from "../Board";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe("mage units", () => {
    test("if can attack enemy units", () => {
        const archimageCell = board.cells[0][0];

        if (archimageCell.unit) {
            archimageCell.unit.highlightCells();

            archimageCell.unit.performAction();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) =>
                        cell.unit?.playerId !== archimageCell.unit?.playerId
                )
                .forEach((cell) => {
                    if (cell.unit && archimageCell.unit) {
                        expect(cell.unit.healthPoints).toBe(
                            cell.unit.maxHealthPoints - archimageCell.unit.power
                        );
                    }
                });
        }
    });

    test("if select targets correctly", () => {
        const archimageCell = board.cells[0][0];

        if (archimageCell.unit) {
            archimageCell.unit?.highlightCells();
            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) =>
                        cell.unit?.playerId !== archimageCell.unit?.playerId
                )
                .forEach((cell) => expect(cell.availiable).toBe(true));
        }
    });
});
