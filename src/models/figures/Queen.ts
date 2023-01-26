import { Colors } from "../../constants/Colors";
import { FigureNames } from "../../constants/FigureNames";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";
import { Figure } from "./Figure";

export class Queen extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.QUEEN;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target))
			return false;
		if (this.cell.isVerticalEmpty(target))
			return true;
		if (this.cell.isHorizontalEmpty(target))
			return true;
		return this.cell.isDiagonalEmpty(target);
	}
}
