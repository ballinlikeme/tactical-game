import { SingleActionStrategy } from "../Strategy";
import { StrategiesType } from "../../enums";
import { Unit } from "../../units/Unit";
import { Cell } from "../../Cell";

export class SingleParalyzeStrategy implements SingleActionStrategy {
    type = StrategiesType.SINGLE as const;

    performAction(unit: Unit, target: Cell): void {
        if (target.availiable && target.unit) {
            if (target.board.queue.currentQueue.includes(target)) {
                target.unit.isParalyzed = true;
                return;
            }
            unit.cell.board.queue.addToParalyzedInNextRound(target);
        }
    }
}
