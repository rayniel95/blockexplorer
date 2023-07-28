'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData, Transaction } from "ethereum-types";
import { alchemy } from "@/src/stateManager/blockchainManager/ethereum";
import { TransactionResponse } from "alchemy-sdk";
import TransactionHash from "@/app/components/commons/transaction/TransactionHash";
import TransactionDetails from "./components/TransactionDetails";


const manager = new EthereumManager();


export default function TransactionBlockHashDetails({params}: {params:{transactionHash:string}}) {
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
	}, []);

	return (
		<div>
			{transaction.hash && <TransactionDetails tx={transaction}/>}
		</div>
	);
}
