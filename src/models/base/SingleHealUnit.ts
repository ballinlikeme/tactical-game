import { Cell } from "../Cell";
import { HealType } from "../enums";
import { HealUnit, HealUnitProps } from "./HealUnit";

export class SingleHealUnit extends HealUnit {
    healType: HealType = HealType.SINGLE;

    constructor(props: HealUnitProps) {
        super(props);
    }

    interactWith(target: Cell): void {
        if (target.availiable && target.unit) {
            if (
                target.unit.healthPoints + this.heal >
                target.unit.maxHealthPoints
            ) {
                target.unit.healthPoints = target.unit.maxHealthPoints;
            } else {
                target.unit.healthPoints += this.heal;
            }
        }
    }
}
