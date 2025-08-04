import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDown, LogOut, Network, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";

export function QuickWalletInfo() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const connected = mounted && account && chain;

				if (!connected) {
					return (
						<div className="text-center p-6">
							<Button onClick={openConnectModal} type="button">
								Connect Wallet
							</Button>
						</div>
					);
				}

				const avatarUrl =
					account.ensAvatar || `https://effigy.im/a/${account.address}.svg`;

				const accountName = account.ensName ?? account.displayName;
				const truncatedAddress = `${account.address.slice(0, 6)}...${account.address.slice(-4)}`;

				return (
					<div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 w-full">
						<div className="flex flex-col items-center space-y-4 p-4 sm:p-6 rounded-lg border bg-card w-full">
							<Avatar className="w-24 h-24 border-4 border-primary/20">
								<AvatarImage src={avatarUrl} alt={accountName} />

								<AvatarFallback className="bg-muted text-2xl font-medium">
									{accountName.length <= 2
										? accountName.toUpperCase()
										: accountName.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>

							<div className="text-center">
								<h2 className="text-xl font-semibold">{accountName}</h2>

								<p className="text-muted-foreground text-sm">
									{truncatedAddress}
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-4">
								<div className="hidden sm:block space-y-1 text-center">
									<p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
										NETWORK
									</p>

									<div className="flex items-center justify-center space-x-1">
										{chain.hasIcon && (
											<div
												className="w-3 h-3 rounded-full"
												style={{ background: chain.iconBackground }}
											/>
										)}

										<span className="font-medium">{chain.name}</span>
									</div>
								</div>

								<div className="space-y-1 text-center">
									<p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
										BALANCE
									</p>

									<p className="font-medium">
										{account.displayBalance || "0.0"}
									</p>
								</div>

								<div className="hidden sm:block space-y-1 text-center">
									<p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
										STATUS
									</p>

									<div className="flex items-center justify-center">
										<div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>

										<span className="text-xs text-muted-foreground">
											Connected
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2 py-2 text-sm sm:text-base"
								onClick={openChainModal}
							>
								<Network className="w-4 h-4" />
								Switch Network
								<ChevronDown className="w-4 h-4 opacity-50" />
							</Button>

							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2 py-2 text-sm sm:text-base"
								onClick={openAccountModal}
							>
								<User className="w-4 h-4" />
								Account
							</Button>

							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2 py-2 text-sm sm:text-base text-destructive hover:text-destructive"
								onClick={() => openAccountModal()}
							>
								<LogOut className="w-4 h-4" />
								Disconnect
							</Button>
						</div>
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
