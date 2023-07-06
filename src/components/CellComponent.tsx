import { Cell } from "../models"

interface CellProps {
    cell: Cell;
    isSelected: boolean;
    selectCell: (cell: Cell) => void
}

export default function CellComponent({ cell, selectCell, isSelected }: CellProps) {
    return (
        <div
            onClick={() => selectCell(cell)}
            className={
                [
                    'cell',
                    isSelected && 'selected',
                    cell.availiable && !cell.unit && 'availiable',
                    cell.availiable && cell.unit && 'availiable_unit'
                ]
                    .join(' ')
            }
        >
            <div className="cell-image">
                <img src={cell.unit?.image} alt={cell.unit?.name} />
            </div>
            <div className="cell-unit">{cell.unit?.healthPoints}/{cell.unit?.maxHealthPoints}</div>
        </div>
    )
}