import { Colors } from "../constants/Colors";
import { Cell } from "./Cell";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Player } from "./Player";

export class Board {
	cells: Cell[][] = [];
	private _activePlayerColor: Colors | undefined = Colors.WHITE;
	private players: Array<Player> = [
		new Player(Colors.WHITE),
		new Player(Colors.BLACK),
	];

	get activePlayer(): Player | undefined {
		return this.players.find(player => player.color === this._activePlayerColor);
	}

	public toggleActivePlayer() {
		this._activePlayerColor = this.players.find(player => player.color !== this._activePlayerColor)?.color;
	}

	public init() {
		for (let y = 0; y < 8; y++) {
			const row: Cell [] = [];
			for (let x = 0; x < 8; x++) {
				const color: Colors = (y + x) % 2 !== 0 ? Colors.WHITE : Colors.BLACK;
				row.push(new Cell(this, x, y, color));
			}
			this.cells.push(row);
		}

		this.addFigures();
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!selectedCell?.figure?.canMove(target);
			}
		}
	}


	public addFigures() {
		this.addPawns();
		this.addKnights();
		this.addKings();
		this.addBishops();
		this.addQueens();
		this.addRooks();
	}

	public reset() {
		this.init();
	}

	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BLACK, this.getCell(i, 1));
			new Pawn(Colors.WHITE, this.getCell(i, 6));
		}
	}

	private addKings() {
		new King(Colors.BLACK, this.getCell(4, 0));
		new King(Colors.WHITE, this.getCell(4, 7));
	}

	private addQueens() {
		new Queen(Colors.BLACK, this.getCell(3, 0));
		new Queen(Colors.WHITE, this.getCell(3, 7));
	}

	private addBishops() {
		new Bishop(Colors.BLACK, this.getCell(2, 0));
		new Bishop(Colors.BLACK, this.getCell(5, 0));
		new Bishop(Colors.WHITE, this.getCell(2, 7));
		new Bishop(Colors.WHITE, this.getCell(5, 7));
	}

	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(1, 0));
		new Knight(Colors.BLACK, this.getCell(6, 0));
		new Knight(Colors.WHITE, this.getCell(1, 7));
		new Knight(Colors.WHITE, this.getCell(6, 7));
	}

	private addRooks() {
		new Rook(Colors.BLACK, this.getCell(0, 0));
		new Rook(Colors.BLACK, this.getCell(7, 0));
		new Rook(Colors.WHITE, this.getCell(0, 7));
		new Rook(Colors.WHITE, this.getCell(7, 7));
	}
}