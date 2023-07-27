'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import List from "../components/commons/Lists";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/src/components/ethereum/blockItem";


const manager = new EthereumManager();
const itemsPerPage = 10

async function blockController(itemsPerPage: number, pageNumber: number): Promise<{ itemsPerPage: number; elementProps: any[]; itemsCount: number }> {
	const items = await manager.getLatestBlocks(1)
	const itemsCount = parseInt(items[0].result.number, 16)
	const elementProps = await manager.getBlocksFromNegativeIndex(
		pageNumber * itemsPerPage,
		pageNumber * itemsPerPage + itemsPerPage
	);
	return {
		itemsPerPage,
		elementProps: elementProps.reverse().map(
			(item) => (item.result)
		),
		itemsCount
	}
}

export default function BlockList() {
	const [offset, setOffset] = useState(0);
	const [itemsCount, setItemsCount] = useState(0)
	const [elementProps, setElementProps] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await blockController(itemsPerPage, offset)
				setElementProps(response.elementProps)
				setItemsCount(response.itemsCount)
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData()
		// Fetch data every five seconds
		const intervalId = setInterval(fetchData, 5000);

		// Clean up interval timer when component unmounts
		return () => {
			clearInterval(intervalId);
		};
	}, [offset]);

	return (
		<div>
			<List
				element={BlockItem}
				itemsCount={itemsCount}
				itemsPerPage={itemsPerPage}
				elementProps={elementProps}
				setOffset={setOffset}
			/>
		</div>
	);
}
