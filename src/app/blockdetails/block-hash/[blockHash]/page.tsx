'use client'

import { useState, useEffect } from "react";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";
import { BlockWithTransactions } from "alchemy-sdk";
import BlockDetailsWithHeader from "../../components/BlockDetailsWithHeader";


export default function BlockHashDetails({ params }: { params: { blockHash: string } }) {
	const [block, setBlock] = useState<BlockWithTransactions>({} as BlockWithTransactions);
	const blockHash = params.blockHash;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await ethereumManager.alchemy.core.getBlockWithTransactions(blockHash)
				setBlock(response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	});

	return (
		<BlockDetailsWithHeader block={block} />
	);
}
