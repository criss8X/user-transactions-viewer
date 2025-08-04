import {
	darkTheme,
	getDefaultConfig,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { ParticlesBackground } from "./components/ParticlesBackground.tsx";
import { useIsDarkTheme } from "./hooks/useIsDarkTheme.ts";

const config = getDefaultConfig({
	appName: "Last Transactions Viewer",
	projectId: "e5c1c2f1f7c747cdb5c3f1f7c747cdb5",
	chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	const isDarkTheme = useIsDarkTheme();

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={isDarkTheme ? darkTheme() : lightTheme()}>
					<ParticlesBackground />

					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
