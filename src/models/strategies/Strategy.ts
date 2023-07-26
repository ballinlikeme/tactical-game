import { Cell } from "../Cell";
import { Unit } from "../units/Unit";
import { StrategiesType } from "../enums/StrategiesType";

export interface HighlightStrategy {
    highlightCells(unit: Unit, cells: Cell[][]): void;
}

export interface SingleActionStrategy {
    performAction(unit: Unit, target: Cell): void;
    type: StrategiesType.SINGLE;
}

export interface MassActionStrategy {
    performAction(unit: Unit, cells: Cell[][]): void;
    type: StrategiesType.MASS;
}
