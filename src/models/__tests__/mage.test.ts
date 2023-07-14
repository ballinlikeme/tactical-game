import { Board } from "../Board";
import { MageUnit } from "../base";

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe('mage units', () => {

    test('if can attack enemy units', () => {
        const archimageCell = board.cells[0][0];

        if (archimageCell.unit instanceof MageUnit) {
            board.hightlightCells(archimageCell);

            archimageCell.unit.interactWith();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter((cell) => cell.unit?.playerId !== archimageCell.unit?.playerId)
                .forEach((cell) => {
                    if (archimageCell.unit instanceof MageUnit && cell.unit) {
                        expect(cell.unit.healthPoints).toBe(cell.unit.maxHealthPoints - archimageCell.unit.damage)
                    }
                })
        }
    })

    test('if select targets correctly', () => {
        const archimageCell = board.cells[0][0];

        board.hightlightCells(archimageCell);

        board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .filter((cell) => cell.unit?.playerId !== archimageCell.unit?.playerId)
            .forEach((cell) => expect(cell.availiable).toBe(true));
    })
})



