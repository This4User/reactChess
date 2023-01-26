import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { Board as BoardModel } from "./models/Board";

function App() {
	const [ board, setBoard ] = useState<BoardModel>(new BoardModel());

	const restart = useCallback(() => {
		const newBoard = new BoardModel();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	}, []);

	useEffect(() => {
		restart();
	}, []);


	return (
		<div className="app">
			<Board
				board={board}
			/>
		</div>
	);
}

export default App;
