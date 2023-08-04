'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData } from "ethereum-types";


const manager = new EthereumManager();

//TODO - this is not finished yet
export default function BlockDetails({params}: {params:{blockNumber:string}}) {
	const [block, setBlock] = useState<BlockWithTransactionData>({} as BlockWithTransactionData);
	const blockNumber = parseInt(params.blockNumber);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = (await manager.getBlocks(blockNumber, blockNumber+1))[0]
				setBlock(response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	});

	return (
		<div>
			here are the block {blockNumber} details

			<p>{JSON.stringify(block)}</p>
		</div>
	);
}
