import { Cell, Board } from "../models";
import { Skeleton } from "../models/units/Skeleton";
import { SkeletonMage } from "../models/units/SkeletonMage";

let board: Board;

beforeEach(() => {
    board = new Board();
});

describe("melee units", () => {
    test("if can attack enemy units", () => {
        const firstCell = new Cell(board, 0, 0, null);
        const secondCell = new Cell(board, 0, 1, null);
        const firstSkeleton = new Skeleton({ cell: firstCell, playerId: 1 });
        const secondSkeleton = new Skeleton({ cell: secondCell, playerId: 0 });

        expect(firstSkeleton.healthPoints).toBe(firstSkeleton.maxHealthPoints);
        expect(secondSkeleton.healthPoints).toBe(
            secondSkeleton.maxHealthPoints
        );

        secondCell.availiable = true;
        firstSkeleton.interactWith(secondCell);

        expect(secondSkeleton.healthPoints).toBe(
            secondSkeleton.maxHealthPoints - firstSkeleton.damage
        );
    });
});

describe("Mage units", () => {
    test("if mage can attack enemy units", () => {
        const firstCell = new Cell(board, 0, 0, null);
        const secondCell = new Cell(board, 0, 1, null);
        const thirdCell = new Cell(board, 1, 0, null);

        const firstSkeleton = new Skeleton({ cell: firstCell, playerId: 0 });
        const secondSkeleton = new Skeleton({ cell: thirdCell, playerId: 0 });
        const skeletonMage = new SkeletonMage({
            cell: secondCell,
            playerId: 1,
        });

        board.cells.push([firstCell, secondCell], [thirdCell]);

        expect(firstSkeleton.healthPoints).toBe(firstSkeleton.maxHealthPoints);
        expect(secondSkeleton.healthPoints).toBe(
            secondSkeleton.maxHealthPoints
        );

        firstCell.availiable = true;
        thirdCell.availiable = true;

        skeletonMage.interactWith();

        expect(firstSkeleton.healthPoints).toBe(
            firstSkeleton.maxHealthPoints - skeletonMage.damage
        );
        expect(secondSkeleton.healthPoints).toBe(
            secondSkeleton.maxHealthPoints - skeletonMage.damage
        );
    });
});
