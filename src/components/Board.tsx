import React, { FC, useCallback, useEffect, useState } from "react";
import useForceRerender from "../hooks/useForceRerender";
import { Board as BoardModel } from "../models/Board";
import { Cell as CellModel } from "../models/Cell";
import Cell from "./Cell";

interface BoardPropsI {
	board: BoardModel;
}

const Board: FC<BoardPropsI> = ({ board }) => {
	const [ selectedCell, setSelectedCell ] = useState<CellModel | null>(null);
	const forceRerender = useForceRerender();
	const highlightCells = useCallback(() => {
		board.highlightCells(selectedCell);
		forceRerender();
	}, [ selectedCell ]);
	const onCellClick = useCallback((cell: CellModel) => {
		if (cell.figure) {
			setSelectedCell(cell);
		}
		if (selectedCell &&
			selectedCell !== cell &&
			selectedCell?.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			setSelectedCell(null);
			forceRerender();
		}
	}, [ selectedCell ]);

	useEffect(() => {
		highlightCells();
	}, [ selectedCell ]);

	return (
		<div className="board">
			{
				board.cells
					 .map((row, index) =>
							  <React.Fragment key={index}>
								  {
									  row.map((cell) => <Cell
										  key={cell.id}
										  cell={cell}
										  isSelected={selectedCell?.id === cell.id}
										  onClick={onCellClick}
									  />)
								  }
							  </React.Fragment>)
			}
		</div>
	);
};

export default Board;