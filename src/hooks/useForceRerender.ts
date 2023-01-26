import { useState } from "react";

export default function useForceRerender(): Function {
	const [ , setValue ] = useState<number>(0);
	return () => setValue(value => value + 1);
}