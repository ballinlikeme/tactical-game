import { Dispatch, SetStateAction, useEffect } from "react";
import { Cell } from "../../models";
import styles from "./QueueComponent.module.css";
import { Unit } from "../../models/units/Unit";

interface QueueProps {
    queue: Cell[] | null;
    setCurrentUnit: Dispatch<SetStateAction<Unit | null>>;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
}

export default function QueueComponent({
    queue,
    setCurrentUnit,
    setSelectedCell,
}: QueueProps) {
    useEffect(() => {
        function defineCurrentUnit() {
            if (queue && queue.length) {
                if (queue[0]) {
                    const currentUnit = queue[0].unit;
                    setCurrentUnit(currentUnit);
                }
            }
        }

        defineCurrentUnit();
    }, [queue, setCurrentUnit]);

    return (
        <div className={styles.queue}>
            {queue &&
                queue.map((cell) => (
                    <div
                        onClick={() => setSelectedCell(cell)}
                        key={cell.id}
                        className={styles.element}
                    >
                        <img
                            className={[
                                cell.unit?.playerId === 0
                                    ? styles.green
                                    : styles.red,
                                styles.image,
                            ].join(" ")}
                            src={cell.unit?.image}
                            alt={cell.unit?.name}
                        />
                    </div>
                ))}
        </div>
    );
}
