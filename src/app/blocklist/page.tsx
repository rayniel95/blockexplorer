'use client'

import { useState, useEffect } from "react";
import List from "../components/commons/Lists";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";
import { BlockItem } from "@/app/components/commons/BlockItem";
import { Container } from "react-bootstrap";


const itemsPerPage = 10

async function blockController(itemsPerPage: number, pageNumber: number): Promise<{ itemsPerPage: number; elementProps: any[]; itemsCount: number }> {
	const items = await ethereumManager.getLatestBlocks(1)
	const itemsCount = parseInt(items[0].result.number, 16)
	const elementProps = await ethereumManager.getBlocksFromNegativeIndex(
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
	const [elementProps, setElementProps] = useState<any[]>([])

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
		<>
			<Container>
				<h4>
					Blocks
				</h4>
			</Container>
			<List
				element={BlockItem}
				itemsCount={itemsCount}
				itemsPerPage={itemsPerPage}
				elementProps={elementProps}
				setOffset={setOffset}
			/>
		</>
	);
}
