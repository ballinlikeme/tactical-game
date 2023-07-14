import { Board } from "../Board"
import { Bandit } from "../units/Bandit"

let board: Board;

beforeEach(() => {
    board = new Board();
    board.initCells();
    board.setupUnitsForTests();
});

describe('melee units', () => {
    test('if can attack enemy units', () => {
        const skeletonCell = board.cells[1][0];
        const elfArcherCell = board.cells[2][0];

        if (
            skeletonCell.unit
            && elfArcherCell.unit
            && skeletonCell.unit instanceof Bandit
        ) {
            elfArcherCell.availiable = true;

            skeletonCell.unit.interactWith(elfArcherCell);

            expect(elfArcherCell.unit.healthPoints)
                .toBe(elfArcherCell.unit.maxHealthPoints - skeletonCell.unit.damage);
        }
    })

    test('if select targets correctly', () => {
        const skeletonCell = board.cells[1][0];
        const elfArcherCell = board.cells[2][0];
        const monkCell = board.cells[2][1];
        const centaurCell = board.cells[2][2];
        const banditCell = board.cells[3][0];
        const sirenaCell = board.cells[3][1];
        const bishopCell = board.cells[3][2];

        if (
            skeletonCell.unit
            && elfArcherCell.unit
            && monkCell.unit
            && centaurCell.unit
            && banditCell.unit
            && sirenaCell.unit
            && bishopCell.unit
        ) {
            expect(elfArcherCell.availiable).toBe(false);
            expect(monkCell.availiable).toBe(false);
            expect(centaurCell.availiable).toBe(false);

            board.hightlightCells(skeletonCell);

            expect(elfArcherCell.availiable).toBe(true);
            expect(monkCell.availiable).toBe(true);
            expect(centaurCell.availiable).toBe(false);

            elfArcherCell.unit.isDead = true;
            monkCell.unit.isDead = true;

            board.hightlightCells(skeletonCell);

            expect(elfArcherCell.availiable).toBe(false);
            expect(monkCell.availiable).toBe(false);
            expect(centaurCell.availiable).toBe(true);

            elfArcherCell.unit.isDead = true;
            monkCell.unit.isDead = true;
            centaurCell.unit.isDead = true;

            board.hightlightCells(skeletonCell);

            expect(banditCell.availiable).toBe(true);
            expect(sirenaCell.availiable).toBe(true);
            expect(bishopCell.availiable).toBe(false);

            banditCell.unit.isDead = true;
            sirenaCell.unit.isDead = true;

            board.hightlightCells(skeletonCell);

            expect(banditCell.availiable).toBe(false);
            expect(sirenaCell.availiable).toBe(false);
            expect(bishopCell.availiable).toBe(true);
        }
    })
})