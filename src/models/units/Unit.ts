import { Cell } from "../Cell";
import { StrategiesType, UnitNames, UnitType } from "../enums";
import { NeighborEnemyStrategy } from "../strategies/target/NeighborEnemyStrategy";
import { HighlightStrategy, ActionStrategy } from "../strategies/Strategy";
import { RangeStrategy, SingleTargetStrategy } from "../strategies/Range";
import { DamageStrategy } from "../strategies/action/DamageStrategy";

export interface UnitProps {
    cell: Cell;
    playerId: number;
}

export class Unit {
    type: UnitType = UnitType.UNIT;
    name: UnitNames = UnitNames.UNIT;
    cell: Cell;
    playerId: number;
    initiative = 0;
    healthPoints = 0;
    maxHealthPoints = 0;
    power = 0;
    isDefending = false;
    isDead = false;
    isParalyzed = false;
    image = "";
    id = Math.random();

    protected rangeStrategy: RangeStrategy = new SingleTargetStrategy();
    protected targetStrategy: HighlightStrategy = new NeighborEnemyStrategy();
    protected actionStrategy: ActionStrategy = new DamageStrategy();

    constructor(props: UnitProps) {
        this.cell = props.cell;
        this.playerId = props.playerId;
        this.cell.unit = this;
    }

    public highlightCells(): void {
        this.targetStrategy.highlightCells(this, this.cell.board.cells);
    }

    public defend(): void {
        this.isDefending = true;
    }

    public performAction(targetCell?: Cell): void {
        this.rangeStrategy.performAction(this, this.actionStrategy, targetCell);
    }

    public takeDamage(damage: number) {
        this.healthPoints = this.isDefending
            ? Math.floor(this.healthPoints - damage / 2)
            : this.healthPoints - damage;
        if (this.healthPoints <= 0) {
            this.healthPoints = 0;
            this.isDead = true;
        }
    }

    public heal(amount: number) {
        this.healthPoints += amount;
        if (this.healthPoints > this.maxHealthPoints)
            this.healthPoints = this.maxHealthPoints;
    }

    public getStrategyType(): StrategiesType {
        return this.rangeStrategy.returnType();
    }
}
