import { Board } from "./Board";
import { BaseUnit } from "./base";
import { UnitType } from "./enums";

export class Cell {
    readonly x: number;
    readonly y: number;
    unit: BaseUnit | null;
    id: number;
    board: Board;
    availiable: boolean = false;

    constructor(board: Board, x: number, y: number, unit: BaseUnit | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.unit = unit;
        this.id = Math.random();
    }

    canUnitInteractWith(target: Cell): boolean {
        console.log(this.unit?.playerId, 'in cell');
        if (this.unit?.type !== UnitType.HEALER) {
            if (this.unit?.playerId !== target.unit?.playerId) {
                return true
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