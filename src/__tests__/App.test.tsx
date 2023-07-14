import { Board } from "../models";
import { MageUnit, MassHealUnit, ParalyzerUnit, SingleHealUnit } from "../models/base";
import { Bandit } from "../models/units/Bandit";

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
                .filter((cell) => cell.unit?.playerId === bishopCell.unit?.playerId && cell.id !== bishopCell.id)
                .forEach((cell) => {
                    if (bishopCell.unit instanceof MassHealUnit) {
                        cell.unit!.healthPoints = cell.unit!.maxHealthPoints - bishopCell.unit.heal;
                    }
                })

            board.hightlightCells(bishopCell);

            bishopCell.unit.interactWith();

            board.cells
                .reduce((prev, curr) => prev.concat(curr))
                .filter((cell) => cell.unit?.playerId === bishopCell.unit?.playerId && cell.id !== bishopCell.id)
                .forEach((cell) => expect(cell.unit?.healthPoints).toBe(cell.unit?.maxHealthPoints));
        }
    })
})

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