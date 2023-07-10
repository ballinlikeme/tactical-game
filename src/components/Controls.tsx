import { Dispatch, SetStateAction } from "react";
import { Cell, Queue } from "../models";
import { BaseUnit } from "../models/base";

interface ControlsProps {
    selectedCell: Cell | null;
    targetCell: Cell | null;
    updateBoard: () => void;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setTargetCell: Dispatch<SetStateAction<Cell | null>>;
    currentUnit: BaseUnit | null;
    queue: Queue;
}

export default function Controls({
    selectedCell,
    targetCell,
    currentUnit,
    updateBoard,
    setSelectedCell,
    setTargetCell,
    queue,
}: ControlsProps) {
    function attack() {
        if (
            selectedCell &&
            targetCell &&
            selectedCell.unit?.id === currentUnit?.id
        ) {
            selectedCell.unit?.interactWith(targetCell);
            updateBoard();
            queue.updateQueue();
            setSelectedCell(null);
            setTargetCell(null);
        }
    }

    function defend() {
        console.log("defend");
    }

    return (
        <div className="controls">
            <button className="button" onClick={() => attack()}>
                ATTACK
            </button>
            <button className="button">DEFEND</button>
        </div>
    );
}
