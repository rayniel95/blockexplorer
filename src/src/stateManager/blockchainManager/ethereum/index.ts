import { EthereumManager } from "./ethereumManager";
import { Network } from "alchemy-sdk";
//TODO - use the network drop down selector for switch between mainnet and 
// testnet

export const networkConfig = {
    [Network.ETH_MAINNET]: {
        apiKey: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_API_KEY,
        networkUrl: "https://eth-mainnet.g.alchemy.com/v2",
    },
    [Network.ETH_SEPOLIA]: {
        apiKey: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_API_KEY,
        networkUrl: "https://eth-sepolia.g.alchemy.com/v2",
    }
}

export const ethereumManager = new EthereumManager(
    Network.ETH_MAINNET, 
    //@ts-ignore
    networkConfig
);
