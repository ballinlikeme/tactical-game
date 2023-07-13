import { BaseUnit, BaseUnitProps } from "./BaseUnit";
import { Cell } from "../Cell";

export type DamageUnitProps = Omit<BaseUnitProps, "type" | "damage">;

export class DamageUnit extends BaseUnit {
    damage: number;

    constructor(props: DamageUnitProps) {
        super(props);
        this.damage = 0;
    }

    interactWith(target: Cell): void {
        if (target.availiable && target.unit) {
            target.unit.healthPoints = target.unit.isDefending
                ? Math.floor(target.unit.healthPoints - this.damage / 2)
                : target.unit.healthPoints - this.damage;
            if (target.unit.healthPoints <= 0) {
                target.unit.isDead = true;
                target.unit.healthPoints = 0;
            }
            console.log(target.unit.healthPoints);
        }
    }
}
