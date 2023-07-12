import { Cell } from "../../models";
import styles from "./CellComponent.module.css";

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
    return (
        <div
            onClick={() => selectCell(cell)}
            className={[
                isParalyzed ? styles.paralyzed : "",
                styles.cell,
                isSelected ? styles.selected : "",
                cell.availiable ? styles.availiable : "",
                isTarget ? styles.target : "",
                cell.unit?.isDead ? styles.dead : "",
            ].join(" ")}
        >
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={cell.unit?.image}
                    alt={cell.unit?.name}
                />
            </div>
            <div className={styles.unit}>
                <div>
                    <div>
                        {cell.unit?.healthPoints}/{cell.unit?.maxHealthPoints}
                    </div>
                </div>
            </div>
        </div>
    );
}
