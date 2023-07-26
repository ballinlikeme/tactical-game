import { Cell } from "../Cell";
import { UnitNames, UnitType, StrategiesType } from "../enums";
import { NeighborEnemyStrategy } from "../strategies/target/NeighborEnemyStrategy";
import { SingleDamageStrategy } from "../strategies/action/SingleDamageStrategy";
import {
    SingleActionStrategy,
    HighlightStrategy,
    MassActionStrategy,
} from "../strategies/Strategy";

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

    protected targetStrategy: HighlightStrategy = new NeighborEnemyStrategy();
    protected actionStrategy: SingleActionStrategy | MassActionStrategy =
        new SingleDamageStrategy();

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
        if (this.actionStrategy.type === StrategiesType.SINGLE && targetCell) {
            this.actionStrategy.performAction(this, targetCell);
            return;
        }
        if (this.actionStrategy.type === StrategiesType.MASS) {
            this.actionStrategy.performAction(this, this.cell.board.cells);
            return;
        }
    }

    public getActionType(): StrategiesType {
        return this.actionStrategy.type;
    }
}
