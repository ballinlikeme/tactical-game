import { Board } from "./Board";
import { UnitType } from "./enums";
import { Unit } from "./units/Unit";

export class Cell {
    readonly x: number;
    readonly y: number;
    unit: Unit | null;
    id: number;
    board: Board;
    availiable = false;

    constructor(board: Board, x: number, y: number, unit: Unit | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.unit = unit;
        this.id = Math.random();
    }

    canUnitInteractWith(target: Cell): boolean {
        if (this.unit?.type !== UnitType.HEALER) {
            if (this.unit?.playerId !== target.unit?.playerId) {
                return true;
            }
            return false;
        } else {
            if (this.unit?.playerId === target.unit?.playerId) {
                return true;
            }
        }
        return false;
    }
}
