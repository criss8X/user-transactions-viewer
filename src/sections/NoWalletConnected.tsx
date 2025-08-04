import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { Button } from "@/components/Button";

export function NoWalletConnected() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
			<div className="w-full max-w-md text-center space-y-8">
				<div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 dark:bg-primary/20">
					<Wallet className="w-12 h-12 text-primary" />
				</div>

				<div className="space-y-4">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
						Transaction Viewer
					</h1>

					<p className="text-muted-foreground text-lg">
						To view your wallet transactions, you need to connect your wallet
						first
					</p>
				</div>

				<div className="pt-2">
					<ConnectButton.Custom>
						{({ openConnectModal }) => (
							<Button
								onClick={openConnectModal}
								size="lg"
								className="text-base"
							>
								<Wallet className="w-5 h-5 mr-2" />
								Connect Wallet
							</Button>
						)}
					</ConnectButton.Custom>
				</div>
			</div>
		</div>
	);
}
