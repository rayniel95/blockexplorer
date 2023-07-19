'use client'

import React, { Dispatch, SetStateAction, useState, useEffect, useCallback, memo } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/src/components/ethereum/blockItem";
import { TransactionItem } from "@/src/components/ethereum/transactionItem";

//TODO - Move all the managers to a singleton instance
const manager = new EthereumManager();
//TODO - move all the page routes to one level up
export default function Home() {
	const [blocks, setBlocks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await manager.getBlocksFromNegativeIndex(0, 5)
				setBlocks(response);
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
	});

	return (
		<Container fluid>
			<Row>
				<Col>
					<ListGroup>
						{blocks.reverse().map((block, index) => {
							return (
								<ListGroup.Item key={index}>
									<BlockItem item={block} />
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>
				<Col>
					<ListGroup>
						{
							manager.extractLatestsTransactions(blocks, 5).map((tx, index) => {
								return (
									<ListGroup.Item key={index}>
										<TransactionItem tx={tx} />
									</ListGroup.Item>
								);
							})
						}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}
