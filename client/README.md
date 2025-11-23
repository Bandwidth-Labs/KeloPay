## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

Deploy KeloPay contracts to testnets:

```shell
# Deploy to Sepolia
forge script script/DeployKeloPay.s.sol:DeployKeloPay --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Deploy to Base Sepolia
forge script script/DeployKeloPay.s.sol:DeployKeloPay --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --verify

# Deploy to Arbitrum Sepolia
forge script script/DeployKeloPay.s.sol:DeployKeloPay --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --broadcast --verify

# Deploy to Lisk Sepolia
forge script script/DeployKeloPay.s.sol:DeployKeloPay --rpc-url $LISK_SEPOLIA_RPC_URL --broadcast --verify

# Deploy to BSC Testnet
forge script script/DeployKeloPay.s.sol:DeployKeloPay --rpc-url $BSC_TESTNET_RPC_URL --broadcast --verify
```

Make sure you have the following environment variables set in your `.env` file:
- `PRIVATE_KEY` - Your deployer private key (testnet only!)
- `SEPOLIA_RPC_URL`, `BASE_SEPOLIA_RPC_URL`, etc. - RPC URLs for each network
- `ETHERSCAN_API_KEY`, `BASESCAN_API_KEY`, etc. - API keys for contract verification

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
