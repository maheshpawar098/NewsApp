import { useEffect, useState } from "react";
import appColors from "utils/constant/colors";

const useTheme = () => {
	const [theme, setTheme] = useState("light");
    const [colors, setColors] = useState(appColors);
	const toggleTheme = () => {
		if (theme !== "dark") {
			// localStorage.setItem("theme", "dark");
			setTheme("dark");
		} else {
			// localStorage.setItem("theme", "light");
			setTheme("light");
		}
	};

	useEffect(() => {
		// const localTheme = localStorage.getItem("theme");
		// if (localTheme) {
		// 	setTheme(localTheme);
		// }
	}, []);

	return {
		theme,
        colors,
		toggleTheme
	};
};


export default useTheme