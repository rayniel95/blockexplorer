'use client'

import { useState, useEffect } from "react";
import { BlockWithTransactions } from "alchemy-sdk";
import BlockDetails from "../../components/BlockDetails";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum/index"


export default function BlockNumberDetails({params}: {params:{blockNumber:string}}) {
	const [block, setBlock] = useState<BlockWithTransactions>({} as BlockWithTransactions);
	const blockNumber = parseInt(params.blockNumber);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = (await ethereumManager.getBlocks(blockNumber, blockNumber+1))[0].result;
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
