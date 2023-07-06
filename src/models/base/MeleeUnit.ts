import { DamageUnit } from "./DamageUnit";
import { UnitType } from "../enums";
import type { DamageUnitProps } from "./DamageUnit";
import { Cell } from "../Cell";

export class MeleeUnit extends DamageUnit {
    type: UnitType = UnitType.MELEE

    constructor(props: DamageUnitProps) {
        super(props);
    }

    checkInteractableUnitsInLine(line: Cell[], target: Cell, currentCell: Cell): boolean {
        const aliveUnits = line.filter((cell) => !cell.unit?.isDead);
        if (aliveUnits.length && aliveUnits.includes(target)) {
            const currentX = currentCell.x;
            const nearestEnemy = aliveUnits.filter((cell) => Math.abs(cell.x - currentX) <= 1);
            if (nearestEnemy.length > 0) {
                if (nearestEnemy.includes(target)) {
                    return true;
                }
            } else if (aliveUnits.includes(target)) return true;
        }
        return false;
    }

    canInteractWith(target: Cell): boolean {
        if (super.canInteractWith(target)) {
            const currentY = this.cell.y;
            
            if (this.playerId === 0) {
                for (let i = currentY - 1; i >= 0; i--) {
                    const line = this.cell.board.cells[i];
                    const unitInLine = line[0].unit;
                    const canInteract = this.playerId !== unitInLine?.playerId;
                    if (canInteract) {
                        const isInteractable = this.checkInteractableUnitsInLine(line, target, this.cell);
                        return isInteractable;
                    }
                }
            }
            if (this.playerId === 1) {
                for (let i = currentY + 1; i <= 3; i++) {
                    const line = this.cell.board.cells[i];
                    const unitInLine = line[0].unit;
                    const canInteract = this.playerId !== unitInLine?.playerId;
                    if (canInteract) {
                        const isInteractable = this.checkInteractableUnitsInLine(line, target, this.cell);
                        return isInteractable;
                    }
                }
            }
        }
        return false;
    }
}
