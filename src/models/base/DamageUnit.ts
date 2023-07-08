import { BaseUnit, BaseUnitProps } from "./BaseUnit";
import { Cell } from "../Cell";

export interface DamageUnitProps extends Omit<BaseUnitProps, 'type' | 'damage'> {
}


export class DamageUnit extends BaseUnit {
    damage: number;

    constructor(props: DamageUnitProps) {
        super(props);
        this.damage = 0;
    }

    interactWith(target: Cell): void {
        if (target.availiable && target.unit) {
            target.unit.healthPoints = target.unit.healthPoints - this.damage;
            if (target.unit.healthPoints <= 0) {
                target.unit.isDead = true;
                target.unit.healthPoints = 0;
            }
        }
    }
}