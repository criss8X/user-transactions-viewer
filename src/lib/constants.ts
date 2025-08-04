import { createPublicClient } from "viem";
import { mainnet } from "viem/chains";
import { http } from "viem";

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});
