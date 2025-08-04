import { useAccount } from "wagmi";
import { NoWalletConnected } from "./sections/NoWalletConnected";
import { UserLastTransactions } from "./sections/UserLastTransactions";

function App() {
	const { address, isConnected } = useAccount();

	if (address === undefined || !isConnected) {
		return <NoWalletConnected />;
	}

	return <UserLastTransactions address={address} />;
}

export default App;
