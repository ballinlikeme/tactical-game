import { DamageUnit } from "./DamageUnit";
import { UnitType } from "../enums";
import type { DamageUnitProps } from "./DamageUnit";

export class MageUnit extends DamageUnit {
    type: UnitType = UnitType.MAGE;

    constructor(props: DamageUnitProps) {
        super(props);
    }

    interactWith(): void {
        this.cell.board.cells.forEach((row) => {
            row.forEach((cell) => {
                if (cell.unit && cell.unit.playerId !== this.playerId) {
                    super.interactWith(cell);
                }
            });
        });
    }
}
