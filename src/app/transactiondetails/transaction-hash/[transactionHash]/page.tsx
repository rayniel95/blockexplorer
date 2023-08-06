'use client'

import { useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { TransactionResponse } from "alchemy-sdk";
import TransactionDetails from "./components/TransactionDetails";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";

const manager = new EthereumManager();


export default function TransactionBlockHashDetails({params}: {params:{transactionHash:string}}) {
	const [transaction, setTransaction] = useState<TransactionResponse>({} as TransactionResponse);
	const {transactionHash} = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = await ethereumManager.getAlchemy().core.getTransaction(transactionHash)
				setTransaction(response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	}, []);

	return (
		<div>
			{transaction.hash && <TransactionDetails tx={transaction}/>}
		</div>
	);
}
