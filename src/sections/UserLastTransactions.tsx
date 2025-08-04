import { AlertCircle, RefreshCw, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { QuickWalletInfo } from "@/components/QuickWalletInfo";
import { TransactionsTable } from "@/components/TransactionsTable";
import type { TransactionLog } from "@/lib/transactions";
import { getLastTransactions } from "@/lib/transactions";

type UserLastTransactionsProps = {
	address: string;
};

export function UserLastTransactions({ address }: UserLastTransactionsProps) {
	const [transactions, setTransactions] = useState<TransactionLog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			const result = await getLastTransactions(address);

			setTransactions(result);
			setError(null);
		} catch (err) {
			console.error("Error fetching transactions:", err);

			setError("Failed to load transactions. Please try again later.");
		} finally {
			setLoading(false);
		}
	}, [address]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<div className="mx-auto p-6 space-y-6 h-full">
			<QuickWalletInfo />

			<div className="max-w-7xl mx-auto">
				{loading ? (
					<div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
						<RefreshCw className="w-12 h-12 text-primary animate-spin" />

						<h3 className="text-xl font-semibold">Loading transactions</h3>

						<p className="text-muted-foreground">
							Searching for your transaction history...
						</p>
					</div>
				) : error ? (
					<ErrorTransactionsFound
						fetchTransactions={fetchTransactions}
						error={error}
					/>
				) : transactions.length === 0 ? (
					<NoTransactionsFound fetchTransactions={fetchTransactions} />
				) : (
					<TransactionsTable
						transactions={transactions}
						onRefresh={fetchTransactions}
					/>
				)}
			</div>
		</div>
	);
}

function ErrorTransactionsFound({
	fetchTransactions,
	error,
}: {
	fetchTransactions: () => void;
	error: string;
}) {
	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-6 text-center bg-destructive/10 rounded-lg border border-destructive/20 max-w-2xl mx-auto">
			<div className="p-3 rounded-full bg-destructive/20 text-destructive">
				<AlertCircle className="w-10 h-10" />
			</div>

			<div className="space-y-2">
				<h3 className="text-xl font-semibold">Something went wrong</h3>
				<p className="text-muted-foreground">{error}</p>
			</div>

			<Button onClick={fetchTransactions}>
				<RefreshCw className="w-4 h-4" />
				Retry
			</Button>
		</div>
	);
}

function NoTransactionsFound({
	fetchTransactions,
}: {
	fetchTransactions: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center p-12 space-y-6 text-center max-w-2xl mx-auto">
			<div className="p-4 rounded-full bg-primary/10 text-primary">
				<Wallet className="w-12 h-12" />
			</div>

			<div className="space-y-2">
				<h3 className="text-2xl font-semibold">No transactions found</h3>

				<p className="text-muted-foreground">
					This wallet has no transaction history yet. When you make
					transactions, they will appear here.
				</p>
			</div>

			<Button onClick={fetchTransactions}>
				<RefreshCw className="w-4 h-4" />
				Refresh
			</Button>
		</div>
	);
}
