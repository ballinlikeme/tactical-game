import { Board } from "../Board";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe("heal units", () => {
    test("if select targets correctly", () => {
        const bishopCell = board.cells[3][2];
        const monkCell = board.cells[2][1];

        if (bishopCell.unit && monkCell.unit) {
            bishopCell.unit.highlightCells();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) =>
                        cell.unit?.playerId === bishopCell.unit?.playerId &&
                        cell.id !== bishopCell.id
                )
                .forEach((cell) => expect(cell.availiable).toBe(true));

            monkCell.unit.highlightCells();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) =>
                        cell.unit?.playerId === monkCell.unit?.playerId &&
                        cell.id !== monkCell.id
                )
                .forEach((cell) => expect(cell.availiable).toBe(true));
        }
    });

    test("if single healer can heal", () => {
        const monkCell = board.cells[2][1];
        const elfArcherCell = board.cells[2][0];

        if (monkCell.unit && elfArcherCell.unit) {
            elfArcherCell.unit.healthPoints =
                elfArcherCell.unit.maxHealthPoints - monkCell.unit.power;

            monkCell.unit.highlightCells();
            monkCell.unit.performAction(elfArcherCell);

            expect(elfArcherCell.unit.healthPoints).toBe(
                elfArcherCell.unit.maxHealthPoints
            );
        }
    });

    test("if mass healer can heal", () => {
        const bishopCell = board.cells[3][2];

        if (bishopCell.unit) {
            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter((cell) => {
                    if (cell.unit && bishopCell.unit) {
                        return (
                            cell.unit.playerId === bishopCell.unit.playerId &&
                            cell.unit.id !== bishopCell.unit.id
                        );
                    }
                })
                .forEach((cell) => {
                    if (cell.unit && bishopCell.unit) {
                        cell.unit.healthPoints =
                            cell.unit.maxHealthPoints - bishopCell.unit.power;
                    }
                });

            bishopCell.unit.highlightCells();
            bishopCell.unit.performAction();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter(
                    (cell) =>
                        cell.unit?.playerId === bishopCell.unit?.playerId &&
                        cell.unit?.id !== bishopCell.unit?.id
                )
                .forEach((cell) =>
                    expect(cell.unit?.healthPoints).toBe(
                        cell.unit?.maxHealthPoints
                    )
                );
        }
    });
});
