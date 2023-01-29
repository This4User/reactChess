import React, { FC, useCallback, useEffect, useState } from "react";
import { Board as BoardModel } from "../models/Board";
import { Cell as CellModel } from "../models/Cell";
import { Player } from "../models/Player";
import Cell from "./Cell";

interface BoardPropsI {
	board: BoardModel;
	forceRerender: Function;
}

const Board: FC<BoardPropsI> = ({ board, forceRerender }) => {
	const [ selectedCell, setSelectedCell ] = useState<CellModel | null>(null);
	const [ activePlayer, setActivePlayer ] = useState<Player | undefined>(board.activePlayer);

	const highlightCells = useCallback(() => {
		board.highlightCells(selectedCell);
		forceRerender();
	}, [ selectedCell ]);
	const onCellClick = useCallback((cell: CellModel) => {
		if (cell.figure && !(cell.figure.color !== activePlayer?.color)) {
			setSelectedCell(cell);
			setActivePlayer(board.activePlayer);
		}
		if (selectedCell &&
			selectedCell !== cell &&
			selectedCell?.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			setActivePlayer(board.activePlayer);
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