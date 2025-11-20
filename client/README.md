This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# KeloPay

## Smart Contract Development

### Compiling Contracts

```bash
npx hardhat compile
```

### Deploying to Testnets

KeloPay smart contracts can be deployed to multiple testnets. Make sure you have configured the following in your `.env` file:

- `PRIVATE_KEY` - Private key for deployment (use testnet wallet only!)
- `SEPOLIA_RPC_URL` - Ethereum Sepolia RPC URL
- `BASE_SEPOLIA_RPC_URL` - Base Sepolia RPC URL
- `ARBITRUM_SEPOLIA_RPC_URL` - Arbitrum Sepolia RPC URL
- `LISK_SEPOLIA_RPC_URL` - Lisk Sepolia RPC URL
- `BSC_TESTNET_RPC_URL` - BSC Testnet RPC URL

#### Deploy KeloPay Main Contract

```bash
# Replace YOUR_TREASURY_ADDRESS with actual treasury address
npx hardhat ignition deploy ignition/modules/KeloPay.ts --network sepolia --parameters '{"treasuryAddress":"YOUR_TREASURY_ADDRESS","platformFeeBasisPoints":100}'
```

#### Deploy Withdrawal Contract

```bash
# Replace YOUR_ADMIN_ADDRESS with actual admin address
npx hardhat ignition deploy ignition/modules/KeloPayWithdrawal.ts --network sepolia --parameters '{"adminAddress":"YOUR_ADMIN_ADDRESS"}'
```

#### Deploy Router Contract

```bash
npx hardhat ignition deploy ignition/modules/KeloPayRouter.ts --network sepolia --parameters '{"adminAddress":"YOUR_ADMIN_ADDRESS"}'
```

#### Deploy Conversion Contract

```bash
npx hardhat ignition deploy ignition/modules/KeloPayConversion.ts --network sepolia --parameters '{"adminAddress":"YOUR_ADMIN_ADDRESS"}'
```

### Verifying Contracts

After deployment, verify contracts on block explorers:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "CONSTRUCTOR_ARG_1" "CONSTRUCTOR_ARG_2"
```

### Testing Contracts

```bash
# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/KeloPay.test.ts
```
