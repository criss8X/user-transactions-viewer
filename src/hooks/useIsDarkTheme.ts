import { useEffect, useState } from "react";

export const useIsDarkTheme = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(() =>
		document.documentElement.classList.contains("dark"),
	);

	useEffect(() => {
		const targetNode = document.documentElement;

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					const isDark = targetNode.classList.contains("dark");

					setIsDarkTheme(isDark);
				}
			});
		});

		observer.observe(targetNode, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	return isDarkTheme;
};
