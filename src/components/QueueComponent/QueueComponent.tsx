import { Dispatch, SetStateAction, useEffect } from "react";
import { Cell, Player } from "../../models";
import { BaseUnit } from "../../models/base";
import styles from "./QueueComponent.module.css";

interface QueueProps {
    queue: Cell[] | null;
    setCurrentPlater: Dispatch<SetStateAction<Player | null>>;
    setCurrentUnit: Dispatch<SetStateAction<BaseUnit | null>>;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
}

export default function QueueComponent({
    queue,
    setCurrentUnit,
    setSelectedCell,
}: QueueProps) {
    function defineCurrentUnit() {
        if (queue && queue.length) {
            const currentUnit = queue![0].unit;
            setCurrentUnit(currentUnit);
        }
    }

    useEffect(() => {
        defineCurrentUnit();
    }, [queue]);

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
