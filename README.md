# Ethereum Transactions Viewer

A simple application to view the transaction history of an Ethereum address.

## 🚀 Technologies Used

- **Vite** - Development tool
- **RainbowKit** - For wallet connection
- **Wagmi** - Hooks for interacting with Ethereum
- **Viem** - Lightweight Ethereum client
- **Etherscan API** - To fetch transaction history
- **Zod** - For schema validation
- **Tailwind CSS** - For styling

## 🔧 Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the project root with the following variables:
   ```env
   VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

   You can get an API key from [Etherscan](https://etherscan.io/apis) by signing up on their website.

4. Start the development server:
   ```bash
   pnpm dev
   ```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
