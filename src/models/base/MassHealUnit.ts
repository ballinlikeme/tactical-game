import { HealType } from "../enums";
import { HealUnit, HealUnitProps } from "./HealUnit";

export class MassHealUnit extends HealUnit {
    healType: HealType = HealType.MASS;

    constructor(props: HealUnitProps) {
        super(props);
    }

    interactWith(): void {
        this.cell.board.cells.forEach((row) => {
            const isAllyRow = row[0].unit?.playerId === this.playerId;
            if (isAllyRow) {
                row.forEach((cell) => {
                    if (cell.unit && cell.availiable) {
                        if (
                            cell.unit.healthPoints + this.heal >
                            cell.unit.maxHealthPoints
                        ) {
                            cell.unit.healthPoints = cell.unit.maxHealthPoints;
                        } else {
                            cell.unit.healthPoints += this.heal;
                        }
                    }
                });
            }
        });
    }
}
