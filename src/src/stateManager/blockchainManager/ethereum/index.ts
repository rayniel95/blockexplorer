import { Alchemy, Network } from "alchemy-sdk";

const settings = {
	apiKey: process.env.NEXT_PUBLIC_ETHEREUM_API_KEY,
	network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);