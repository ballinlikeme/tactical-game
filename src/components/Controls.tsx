import { Dispatch, SetStateAction } from "react"
import { Cell } from "../models";
import { BaseUnit } from "../models/base";

interface ControlsProps {
    selectedCell: Cell | null;
    targetCell: Cell | null;
    updateBoard: () => void;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setTargetCell: Dispatch<SetStateAction<Cell | null>>;
    setQueue: Dispatch<SetStateAction<Cell[] | null>>;
    currentUnit: BaseUnit | null;
}

export default function Controls({ selectedCell, targetCell, currentUnit, updateBoard, setQueue, setSelectedCell, setTargetCell }: ControlsProps) {

    function attack() {
        if (selectedCell && targetCell && selectedCell!.unit!.id === currentUnit?.id) {
            selectedCell.unit?.interactWith(targetCell);
            setQueue(prev => prev!.slice(1).filter(cell => !cell.unit?.isDead));
            updateBoard();
            setSelectedCell(null);
            setTargetCell(null);
        }
    }

    function defend() {

    }

    return (
        <div className="controls">
            <button className="button" onClick={() => attack()}>ATTACK</button>
            <button className="button">DEFEND</button>
        </div>
    )
}