import logo from "../../assets/black-king.png";
import { Colors } from "../../constants/Colors";
import { FigureNames } from "../../constants/FigureNames";
import { Cell } from "../Cell";

export class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureNames;
	id: number;


	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.logo = null;
		this.name = FigureNames.FIGURE;
		this.id = Math.random();
	}

	canMove(target: Cell): boolean {
		if (target.figure?.color === this.color)
			return false;
		return target.figure?.name !== FigureNames.KING;
	}

	move(target: Cell) {}
}
