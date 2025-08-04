import { formatDistanceToNow } from "date-fns";
import { RefreshCw } from "lucide-react";
import { formatEther } from "viem/utils";
import type { TransactionLog } from "@/lib/transactions";
import { Badge } from "./Badge";
import { Button } from "./Button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./Table";

export function TransactionsTable({
	transactions,
	onRefresh,
}: {
	transactions: TransactionLog[];
	onRefresh: () => void;
}) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-base font-bold text-neutral-900 dark:text-white sm:text-2xl">
					Transaction History
				</h2>

				<Button onClick={onRefresh} variant="outline" className="gap-2">
					<RefreshCw className="h-4 w-4" />
					Refresh
				</Button>
			</div>

			<div className="border border-neutral-200 overflow-hidden dark:border-neutral-700">
				<Table>
					<TableHeader>
						<TableRow className="bg-card hover:bg-card/70 dark:bg-card/30 dark:hover:bg-card/40">
							<TableHead className="w-[180px] text-neutral-600 font-medium dark:text-neutral-300">
								Transaction
							</TableHead>

							<TableHead className="text-neutral-600 font-medium dark:text-neutral-300">
								Status
							</TableHead>

							<TableHead className="text-neutral-600 font-medium dark:text-neutral-300">
								Block
							</TableHead>

							<TableHead className="text-neutral-600 font-medium dark:text-neutral-300">
								Age
							</TableHead>

							<TableHead className="text-neutral-600 font-medium dark:text-neutral-300">
								From
							</TableHead>

							<TableHead className="text-neutral-600 font-medium dark:text-neutral-300">
								To
							</TableHead>

							<TableHead className="text-right text-neutral-600 font-medium dark:text-neutral-300">
								Value
							</TableHead>

							<TableHead className="text-right text-neutral-600 font-medium dark:text-neutral-300">
								Gas Price
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{transactions.map((tx) => (
							<TableRow
								key={`${tx.hash}-${tx.transactionIndex}`}
								className="bg-card dark:bg-card/70 dark:hover:bg-card"
							>
								<TableCell className="py-3">
									<a
										href={`https://etherscan.io/tx/${tx.hash}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-mono text-sm hover:underline"
									>
										{shortenHash(tx.hash)}
									</a>
								</TableCell>

								<TableCell>
									<BadgeStatus isError={tx.isError} />
								</TableCell>

								<TableCell className="text-neutral-700 dark:text-neutral-300">
									{parseInt(tx.blockNumber)}
								</TableCell>

								<TableCell className="text-neutral-700 dark:text-neutral-300">
									{formatTimestamp(tx.timeStamp)}
								</TableCell>

								<TableCell className="text-neutral-700 font-mono text-sm dark:text-neutral-300">
									{shortenHash(tx.from)}
								</TableCell>

								<TableCell className="text-neutral-700 font-mono text-sm dark:text-neutral-300">
									{tx.to ? shortenHash(tx.to) : "Contract Creation"}
								</TableCell>

								<TableCell className="text-right text-neutral-800 font-medium dark:text-neutral-300">
									{formatValue(tx.value)}
								</TableCell>

								<TableCell className="text-right text-neutral-700 dark:text-neutral-300">
									{formatGasPrice(tx.gasPrice)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{transactions.length > 0 && (
				<div className="flex justify-end items-center text-sm text-neutral-600 dark:text-neutral-300">
					Total: <span className="font-medium ml-1">{transactions.length}</span>
				</div>
			)}
		</div>
	);
}

function BadgeStatus({ isError }: { isError: string }) {
	const status = isError === "1" ? "Failed" : "Success";

	return (
		<Badge
			variant={isError === "1" ? "destructive" : "default"}
			className={`${
				isError === "1"
					? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
					: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
			}`}
		>
			{status}
		</Badge>
	);
}

function shortenHash(hash: string): string {
	return `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;
}

function formatTimestamp(timestamp: string): string {
	try {
		const date = new Date(parseInt(timestamp) * 1000);
		return formatDistanceToNow(date, { addSuffix: true });
	} catch {
		return timestamp;
	}
}

function formatGasPrice(gasPrice: string): string {
	try {
		const priceInGwei = parseInt(gasPrice) / 1e9;
		return priceInGwei < 1
			? `${priceInGwei.toFixed(2)} Gwei`
			: `${Math.round(priceInGwei)} Gwei`;
	} catch {
		return gasPrice;
	}
}

function formatValue(value: string) {
	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "ETH",
			minimumFractionDigits: 6,
			maximumFractionDigits: 6,
		}).format(parseFloat(formatEther(BigInt(value))));
	} catch {
		return "0 ETH";
	}
}
