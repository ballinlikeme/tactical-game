import { Cell } from "..";
import { Unit } from "../units";
import { ActionStrategy } from "./Strategy";
import { StrategiesType } from "../enums";

export interface RangeStrategy {
    performAction(unit: Unit, strategy: ActionStrategy, target?: Cell): void;
    returnType(): StrategiesType;
}

export class MassTargetStrategy implements RangeStrategy {
    performAction(unit: Unit, strategy: ActionStrategy): void {
        unit.cell.board.cells
            .reduce((prev, curr) => prev.concat(curr))
            .forEach((cell) => {
                if (cell.unit && cell.availiable) {
                    strategy.performAction(unit, cell);
                }
            });
    }

    returnType(): StrategiesType {
        return StrategiesType.MASS;
    }
}

export class SingleTargetStrategy implements RangeStrategy {
    performAction(unit: Unit, strategy: ActionStrategy, target?: Cell): void {
        if (target && target.unit && target.availiable) {
            strategy.performAction(unit, target);
        }
    }

    returnType(): StrategiesType {
        return StrategiesType.SINGLE;
    }
}
