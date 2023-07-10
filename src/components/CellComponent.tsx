import { Cell } from "../models";
import { DamageUnit } from "../models/base";

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
                isParalyzed && "paralyzed",
                "cell",
                isSelected && "selected",
                cell.availiable && cell.unit && "availiable_unit",
                isTarget && "target",
                cell.unit?.isDead && "dead",
            ].join(" ")}
        >
            <div className="cell-image">
                <img src={cell.unit?.image} alt={cell.unit?.name} />
            </div>
            <div className="cell-unit">
                <div>
                    <div>
                        {cell.unit?.healthPoints}/{cell.unit?.maxHealthPoints}
                    </div>
                </div>
            </div>
        </div>
    );
}
