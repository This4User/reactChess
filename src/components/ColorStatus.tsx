import React, { FC } from "react";
import { Colors } from "../constants/Colors";

interface ColorStatusPropsI {
	activeColor: Colors;
}

const ColorStatus: FC<ColorStatusPropsI> = ({ activeColor }) => {
	return (
		<div className="status">
			<div
				className="status__cell  status__cell_active"
				style={{
					left: activeColor === Colors.WHITE ? 0 : "50%",
				}}
			></div>
			<div className="status__cell status__cell_white"></div>
			<div className="status__cell status__cell_black"></div>
		</div>
	);
};

export default ColorStatus;