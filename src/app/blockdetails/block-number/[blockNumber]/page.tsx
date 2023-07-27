'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData } from "ethereum-types";
import { BlockWithTransactions } from "alchemy-sdk";
import BlockDetails from "../../components/BlockDetails";


const manager = new EthereumManager();


export default function BlockNumberDetails({params}: {params:{blockNumber:string}}) {
	const [block, setBlock] = useState<BlockWithTransactions>({} as BlockWithTransactions);
	const blockNumber = parseInt(params.blockNumber);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = (await manager.getBlocks(blockNumber, blockNumber+1))[0].result;
				setBlock(response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	}, []);

	return (
		<div>
			{block.number && <BlockDetails block={block} />}
		</div>
	);
}
