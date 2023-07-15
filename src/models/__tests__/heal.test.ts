import { Board } from "../Board";
import { MassHealUnit, SingleHealUnit } from "../base";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe('heal units', () => {
    test('if select targets correctly', () => {
        const bishopCell = board.cells[3][2];
        const monkCell = board.cells[2][1];

        board.hightlightCells(bishopCell);

        board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .filter((cell) => cell.unit?.playerId === bishopCell.unit?.playerId && cell.id !== bishopCell.id)
            .forEach((cell) => expect(cell.availiable).toBe(true));

        board.hightlightCells(monkCell);

        board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .filter((cell) => cell.unit?.playerId === monkCell.unit?.playerId && cell.id !== monkCell.id)
            .forEach((cell) => expect(cell.availiable).toBe(true));
    })

    test('if single healer can heal', () => {
        const monkCell = board.cells[2][1];
        const elfArcherCell = board.cells[2][0];

        if (monkCell.unit && elfArcherCell.unit && monkCell.unit instanceof SingleHealUnit) {
            elfArcherCell.unit.healthPoints = elfArcherCell.unit.maxHealthPoints - monkCell.unit.heal;

            board.hightlightCells(monkCell);

            monkCell.unit.interactWith(elfArcherCell);

            expect(elfArcherCell.unit.healthPoints).toBe(elfArcherCell.unit.maxHealthPoints);
        }
    })

    test('if mass healer can heal', () => {
        const bishopCell = board.cells[3][2];

        if (bishopCell.unit instanceof MassHealUnit) {
            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter((cell) => cell.unit?.playerId === bishopCell.unit?.playerId)
                .forEach((cell) => {
                    if (bishopCell.unit instanceof MassHealUnit) {
                        cell.unit!.healthPoints = cell.unit!.maxHealthPoints - bishopCell.unit.heal;
                    }
                })

            board.hightlightCells(bishopCell);

            bishopCell.unit.interactWith();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter((cell) => cell.unit?.playerId === bishopCell.unit?.playerId)
                .forEach((cell) => expect(cell.unit?.healthPoints).toBe(cell.unit?.maxHealthPoints));
        }
    })
})