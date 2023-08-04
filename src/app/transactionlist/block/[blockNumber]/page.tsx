'use client'

import React, { Dispatch, SetStateAction, useState, useEffect, useMemo } from "react";
import List from "../../../components/commons/Lists";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/app/components/commons/BlockItem";
import BlockNumber from "@/app/components/commons/block/BlockNumber";
import { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import { TransactionItem } from "@/app/components/commons/TransactionItem";

const manager = new EthereumManager();
const itemsPerPage = 10

function transactionController(transactions: TransactionResponse[], itemsPerPage: number, pageNumber: number): TransactionResponse[] {
	const elementProps = transactions.slice(
		pageNumber * itemsPerPage,
		pageNumber * itemsPerPage + itemsPerPage
	);
	return elementProps
}

export default function TransactionList({params}: {params: {blockNumber: string}}) {
	const [offset, setOffset] = useState(0);
	const [itemsCount, setItemsCount] = useState(0)
	const [transactions, setTransactions] = useState<TransactionResponse[]>([])

	const blockNumber = parseInt(params.blockNumber);
	const elementProps = useMemo(
		() => transactionController(transactions, itemsPerPage, offset), [offset, itemsCount]
	)
	console.log(elementProps)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: BlockWithTransactions = (await manager.getBlocks(blockNumber, blockNumber+1))[0].result
				const reverseTransactions = response.transactions.reverse()
				setItemsCount(response.transactions.length)
				setTransactions(reverseTransactions)
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData()
	}, []);

	return (
		<div>
			{itemsCount!=0 && <List
				element={TransactionItem}
				itemsCount={itemsCount}
				itemsPerPage={itemsPerPage}
				elementProps={elementProps}
				setOffset={setOffset}
			/>}
		</div>
	);
}
