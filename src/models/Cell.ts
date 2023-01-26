import { Colors } from "../constants/Colors";
import { Board } from "./Board";
import { Figure } from "./figures/Figure";

export class Cell {
	get board(): Board | null {
		return this._board;
	}

	get figure(): Figure | null {
		return this._figure;
	}

	set figure(value: Figure | null) {
		this._figure = value;
	}

	id: number;
	readonly x: number;
	readonly y: number;
	readonly color: Colors;
	private _figure: Figure | null = null;
	private readonly _board: Board;
	available: boolean = false;

	constructor(
		board: Board, x: number, y: number,
		color: Colors,
	) {
		this.id = Number(`${x}${y}`);
		this.x = x;
		this.y = y;
		this.color = color;
		this._board = board;
	}

	get isEmpty() {
		return !this.figure;
	}

	isEnemy(cell: Cell) {
		return !cell.isEmpty && (cell.figure?.color !== this.figure?.color);
	}

	isVerticalEmpty(target: Cell): boolean {
		if (this.x !== target.x) {
			return false;
		}

		const min = Math.min(this.y, target.y);
		const max = Math.max(this.y, target.y);
		for (let y = min + 1; y < max; y++) {
			if (!this.board?.getCell(this.x, y).isEmpty) {
				return false;
			}
		}
		return true;
	}

	isHorizontalEmpty(target: Cell): boolean {
		if (this.y !== target.y) {
			return false;
		}

		const min = Math.min(this.x, target.x);
		const max = Math.max(this.x, target.x);
		for (let x = min + 1; x < max; x++) {
			if (!this.board?.getCell(x, this.y).isEmpty) {
				return false;
			}
		}
		return true;
	}

	isDiagonalEmpty(target: Cell): boolean {
		const absX = Math.abs(target.x - this.x);
		const absY = Math.abs(target.y - this.y);
		if (absY !== absX)
			return false;

		const dy = this.y < target.y ? 1 : -1;
		const dx = this.x < target.x ? 1 : -1;

		for (let i = 1; i < absY; i++) {
			if (!this.board?.getCell(this.x + dx * i, this.y + dy * i).isEmpty)
				return false;
		}
		return true;
	}

	setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this;
	}

	moveFigure(target: Cell) {
		if (this.figure?.canMove(target)) {
			this.figure?.move(target);
			target.setFigure(this.figure);
			this.figure = null;
		}
	}
}