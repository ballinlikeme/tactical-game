import { Board } from "../Board";

let board: Board;

beforeEach(() => {
    board = new Board();
})

describe('board', () => {
    test('if inits cells correctly', () => {
        board.initCells();

        expect(board.cells
            .reduce((prev, curr) => prev.concat(curr)).length).toBe(12);
    })

    test('if sets up units correctly', () => {
        board.initCells()
        board.setUpUnits();

        board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((cell) => expect(cell.unit).not.toBe(null))
    })
})