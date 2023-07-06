import { Dispatch, SetStateAction, useEffect } from "react"
import { Cell, Player } from "../models"
import { BaseUnit } from "../models/base";

interface QueueProps {
    cells: Cell[][];
    setCurrentPlater: Dispatch<SetStateAction<Player | null>>;
    setCurrentUnit: Dispatch<SetStateAction<BaseUnit | null>>;
    swapPlayer: () => void;
}

export default function Queue({ cells, setCurrentUnit }: QueueProps) {

    const queue = cells.reduce((prev, curr) => prev.concat(curr)).sort((a, b) => b.unit!.initiative - a.unit!.initiative);

    function defineCurrentUnit() {
        const currentUnit = queue[0].unit;
        setCurrentUnit(currentUnit);
    }

    useEffect(() => {
        defineCurrentUnit();
    }, [queue])

    return (
        <div className="queue">
            {queue.map(cell => (
                <div className={[
                    "queue__element",
                ].join(' ')}>
                    <img className={cell.unit?.playerId === 0 ? 'red-outline' : 'green-outline'} src={cell.unit?.image} alt={cell.unit?.name} />
                </div>
            ))}
        </div>
    )
}