import classNames from "classnames";
import React, { FC } from "react";
import { Cell as CellModel } from "../models/Cell";

interface CellPropsI {
	cell: CellModel;
	isSelected: boolean;
	onClick: (cell: CellModel) => void;
}

const Cell: FC<CellPropsI> = ({ cell, isSelected, onClick }) => {
	return (
		<div
			className={classNames(`cell cell_${cell.color}`,
								  {
									  cell_selected: isSelected,
									  cell_available: cell.available && cell.figure,
								  })}
			onClick={() => onClick(cell)}
		>
			{cell.available && !cell.figure && <div className="dot"></div>}
			{cell.figure?.logo && <img
				src={cell.figure.logo}
				alt={cell.figure.name}
			/>}
		</div>
	);
};

export default Cell;