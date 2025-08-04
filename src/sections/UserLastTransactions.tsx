import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/Button";
import { QuickWalletInfo } from "@/components/QuickWalletInfo";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getLastTransactions } from "@/lib/transactions";

type UserLastTransactionsProps = {
	address: string;
};

export function UserLastTransactions({ address }: UserLastTransactionsProps) {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["transactions", address],
		initialData: [],
		queryFn: () => getLastTransactions(address),
		staleTime: 60 * 1000,
	});

	return (
		<main className="mx-auto p-6 space-y-6 h-full">
			<QuickWalletInfo />

			<div className="max-w-7xl mx-auto">
				{isLoading ? (
					<div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
						<RefreshCw className="w-12 h-12 text-primary animate-spin" />

						<h3 className="text-xl font-semibold">Loading transactions</h3>

						<p className="text-muted-foreground">
							Searching for your transaction history...
						</p>
					</div>
				) : error !== null ? (
					<ErrorTransactionsFound fetchTransactions={refetch} />
				) : data.length === 0 ? (
					<NoTransactionsFound fetchTransactions={refetch} />
				) : (
					<TransactionsTable transactions={data} onRefresh={refetch} />
				)}
			</div>
		</main>
	);
}

function ErrorTransactionsFound({
	fetchTransactions,
}: {
	fetchTransactions: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-6 text-center bg-destructive/10 rounded-lg border border-destructive/20 max-w-2xl mx-auto">
			<div className="p-3 rounded-full bg-destructive/20 text-destructive">
				<AlertCircle className="w-10 h-10" />
			</div>

			<div className="space-y-2">
				<h3 className="text-xl font-semibold">Something went wrong</h3>

				<p className="text-muted-foreground">
					Failed to load transactions. Please try again later.
				</p>
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
