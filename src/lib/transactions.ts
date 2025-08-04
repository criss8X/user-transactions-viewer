import z from "zod";

// #region Validations
export const TransactionLogSchema = z.object({
	blockNumber: z.string(),
	timeStamp: z.string(),
	hash: z.string(),
	nonce: z.string(),
	blockHash: z.string(),
	transactionIndex: z.string(),
	from: z.string(),
	to: z.string(),
	value: z.string(),
	gas: z.string(),
	gasPrice: z.string(),
	isError: z.string(),
	txreceipt_status: z.string(),
	input: z.string(),
});

export const EtherscanTxLogsResponseSchema = z.object({
	status: z.string(),
	message: z.string(),
	result: z.array(TransactionLogSchema),
});

export type TransactionLog = z.infer<typeof TransactionLogSchema>;

export type EtherscanTxLogsResponse = z.infer<
	typeof EtherscanTxLogsResponseSchema
>;

class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

class ApiError extends Error {
	status: string;

	constructor(message: string, status: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

if (ETHERSCAN_API_KEY === undefined || typeof ETHERSCAN_API_KEY !== "string") {
	throw new Error("ETHERSCAN_API_KEY is not defined or is not a string");
}

export async function getLastTransactions(
	walletAddress: string,
): Promise<TransactionLog[]> {
	if (!walletAddress) {
		throw new ValidationError("Wallet address is required");
	}

	if (!ETHEREUM_ADDRESS_REGEX.test(walletAddress)) {
		throw new ValidationError("Invalid Ethereum wallet address format");
	}

	try {
		const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=5&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new ApiError(
				`HTTP error! status: ${response.status}`,
				response.status.toString(),
			);
		}

		const data = await response.json();

		const parsedData = EtherscanTxLogsResponseSchema.parse(data);

		if (parsedData.status !== "1") {
			if (
				parsedData.message === "No transactions found" ||
				parsedData.result.length === 0
			) {
				return [];
			}

			throw new ApiError(
				parsedData.message || "Unknown API error",
				parsedData.status,
			);
		}

		return parsedData.result;
	} catch (error) {
		if (error instanceof ValidationError || error instanceof ApiError) {
			throw error;
		}

		if (error instanceof z.ZodError) {
			console.error(error);

			throw new ValidationError(
				`Invalid response from Etherscan API: ${error.issues
					.map((issue) => issue.message)
					.join(", ")}`,
			);
		}

		throw new Error(
			`Failed to fetch transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}
