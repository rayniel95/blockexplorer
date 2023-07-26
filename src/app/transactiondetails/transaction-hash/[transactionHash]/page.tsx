'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData, Transaction } from "ethereum-types";
import { alchemy } from "@/src/stateManager/blockchainManager/ethereum";
import { TransactionResponse } from "alchemy-sdk";


const manager = new EthereumManager();


export default function TransactionDetails({params}: {params:{transactionHash:string}}) {
	const [transaction, setTransaction] = useState<TransactionResponse>({} as TransactionResponse);
	const {transactionHash} = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				//TODO - add loading item to items that read from network
				const response = await alchemy.core.getTransaction(transactionHash)
				setTransaction(response);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData();
	});

	return (
		<div>
			here are the block {transactionHash} details

			<p>{JSON.stringify(transaction)}</p>
		</div>
	);
}
