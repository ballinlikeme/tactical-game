import { Unit } from "../../units/Unit";
import { Cell } from "../../Cell";
import { ActionStrategy } from "../Strategy";

export class ParalyzeStrategy implements ActionStrategy {
    performAction(unit: Unit, target: Cell): void {
        if (target.unit && target.availiable) {
            if (target.board.queue.currentQueue.includes(target)) {
                target.unit.isParalyzed = true;
                return;
            }
            unit.cell.board.queue.addToParalyzedInNextRound(target);
        }
    }
}
