import { Cell } from "../../models";
import { BaseUnit, DamageUnit, HealUnit } from "../../models/base";
import styles from "./CellComponent.module.css";
import skull from "../../assets/skull.svg";

interface CellProps {
    cell: Cell;
    isSelected: boolean;
    isTarget: boolean;
    isParalyzed: boolean;
    selectCell: (cell: Cell) => void;
}

export default function CellComponent({
    cell,
    selectCell,
    isSelected,
    isTarget,
    isParalyzed,
}: CellProps) {
    function isDamager(unit: BaseUnit): unit is DamageUnit {
        if (unit instanceof DamageUnit) return true;
        return false;
    }

    function isHealer(unit: BaseUnit): unit is HealUnit {
        if (unit instanceof HealUnit) return true;
        return false;
    }

    if (cell.unit) {
        return (
            <div
                className={[
                    styles.cell,
                    isSelected ? styles.selected : "",
                    cell.availiable ? styles.availiable : "",
                    isTarget ? styles.target : "",
                    cell.unit.isDead ? styles.dead : "",
                ].join(" ")}
                onClick={() => selectCell(cell)}
                aria-label="cell"
            >
                <div className={cell.unit.isDead ? `${styles.death} ${styles.active}` : styles.death}>
                    <img src={skull} alt="Skull" />
                </div>
                <div className={styles.header}>
                    <h3>{cell.unit.name}</h3>
                </div>
                <div className={styles.body}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.image}
                            src={cell.unit.image}
                            alt={cell.unit.name}
                        />
                        <div
                            className={styles.level}
                            style={{
                                height: `${100 -
                                    (cell.unit.healthPoints /
                                        cell.unit.maxHealthPoints) *
                                    100
                                    }%`,
                            }}
                        ></div>
                    </div>
                    <div>
                        <div className={styles.container}>
                            <ul className={styles.column}>
                                <li className="cell-item">HP</li>
                                {isDamager(cell.unit) && (
                                    <li className="cell-item">Damage</li>
                                )}
                                {isHealer(cell.unit) && (
                                    <>
                                        <li className="cell-item">Heal</li>
                                        <li className="cell-item">Heal Type</li>
                                    </>
                                )}
                            </ul>
                            <ul className={styles.column}>
                                <li className="cell-item">
                                    {cell.unit.healthPoints}/
                                    {cell.unit.maxHealthPoints}
                                </li>
                                {isDamager(cell.unit) && (
                                    <li className="cell-item">
                                        {cell.unit.damage}
                                    </li>
                                )}
                                {isHealer(cell.unit) && (
                                    <>
                                        <li className="cell-item">
                                            {cell.unit.heal}
                                        </li>
                                        <li className="cell-item">
                                            {cell.unit.healType}
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <ul className={styles.effects}>
                            {isParalyzed && (
                                <li
                                    className={`${styles.effect} ${styles.effectRed}`}
                                >
                                    Paralyzed
                                </li>
                            )}
                            {cell.unit.isDefending && (
                                <li
                                    className={`${styles.effect} ${styles.effectGreen}`}
                                >
                                    Defending
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return <div className="cell"></div>;
}
