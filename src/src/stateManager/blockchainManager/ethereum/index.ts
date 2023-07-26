import { Alchemy, Network } from "alchemy-sdk";
//TODO - use the network drop down selector for switch between mainnet and 
// testnet
const settings = {
	apiKey: process.env.NEXT_PUBLIC_ETHEREUM_API_KEY,
	network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);