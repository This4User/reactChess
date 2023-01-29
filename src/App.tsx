import React, { useCallback, useEffect, useMemo } from "react";
import "./App.css";
import Board from "./components/Board";
import ColorStatus from "./components/ColorStatus";
import { Colors } from "./constants/Colors";
import useForceRerender from "./hooks/useForceRerender";
import { Board as BoardModel } from "./models/Board";

function App() {
	const board = useMemo(() => new BoardModel(), []);
	const forceRerender = useForceRerender();

	const restart = useCallback(() => {
		board.init();
	}, []);

	useEffect(() => {
		restart();
	}, []);


	return (
		<div className="app">
			<ColorStatus activeColor={board.activePlayer?.color ?? Colors.WHITE}/>
			<Board
				board={board}
				forceRerender={forceRerender}
			/>
		</div>
	);
}

export default App;
