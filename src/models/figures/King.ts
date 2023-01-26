import { Colors } from "../../constants/Colors";
import { FigureNames } from "../../constants/FigureNames";
import { Figure } from "./Figure";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KING;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;
		const availableCells: Array<{ x: number, y: number }> = [
			{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
			{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 },
			{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
		];

		return availableCells.some(({ x, y }) => {
			return (this.cell.x + x === target.x) && (this.cell.y + y === target.y)
		});
	}
}
