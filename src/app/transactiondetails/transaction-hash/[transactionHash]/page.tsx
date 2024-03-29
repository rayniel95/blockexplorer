'use client'

import { useState, useEffect } from "react";
import { TransactionResponse } from "alchemy-sdk";
import TransactionDetails from "./components/TransactionDetails";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";


export default function TransactionBlockHashDetails({ params }: { params: { transactionHash: string } }) {
	const [transaction, setTransaction] = useState<TransactionResponse>({} as TransactionResponse);
	const { transactionHash } = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = await ethereumManager.getAlchemy().core.getTransaction(transactionHash)
				setTransaction(response!);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	}, []);

	return (
		<>
			<h4>Transaction Details</h4>
			{transaction.hash && <TransactionDetails tx={transaction} />}
		</>
	);
}
