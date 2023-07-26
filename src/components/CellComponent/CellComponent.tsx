import { Cell } from "../../models";
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
                <div
                    className={
                        cell.unit.isDead
                            ? `${styles.death} ${styles.active}`
                            : styles.death
                    }
                >
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
                                height: `${
                                    100 -
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
                                <li className="cell-item">Power</li>
                            </ul>
                            <ul className={styles.column}>
                                <li className="cell-item">
                                    {cell.unit.healthPoints}/
                                    {cell.unit.maxHealthPoints}
                                </li>
                                <li>{cell.unit.power}</li>
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
