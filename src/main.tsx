import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers.tsx";

const root = document.getElementById("root");

if (root === null) {
	throw new Error("No root found.");
}

createRoot(root).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>,
);
