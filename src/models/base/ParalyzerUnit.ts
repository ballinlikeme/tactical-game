import { BaseUnit, BaseUnitProps } from "./BaseUnit";
import { Cell } from "../index";
import { UnitType } from "../enums";

export type ParalyzerUnitProps = Omit<BaseUnitProps, "type">;

export class ParalyzerUnit extends BaseUnit {
    type: UnitType = UnitType.PARALYZER;

    constructor(props: ParalyzerUnitProps) {
        super(props);
    }

    interactWith(target: Cell): void {
        if (target.unit) {
            if (this.cell.board.queue.currentQueue.includes(target)) {
                target.unit.isParalyzed = true;
                return;
            }
            this.cell.board.queue.addToParalyzedInNextRound(target);
        }
    }
}
