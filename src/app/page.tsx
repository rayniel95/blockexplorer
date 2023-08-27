'use client'

import { useState, useEffect } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { BlockItem } from "@/app/components/commons/BlockItem";
import { TransactionItem } from "@/app/components/commons/TransactionItem";
import { useAppSelector } from "@/src/stateManager/hooks";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";


//TODO - add horizontal scroll to text in address, etc.
export default function Home() {
	const [blocks, setBlocks] = useState([]);
	const network = useAppSelector((state) => state.network.newtork);


	let files = {
		"add.huff": "#define function add(uint256,uint256) nonpayable returns (uint256)\n" +
			"\n" +
			"#define macro MAIN() = {\n" +
			"   // Load our numbers from calldata and add them together.\n" +
			"   0x04 calldataload // [number1]\n" +
			"   0x24 calldataload // [number2]\n" +
			"   add               // [number1+number2]\n" +
			"   // Return our new number.\n" +
			"   0x00 mstore // Store our number in memory.\n" +
			"   0x20 0x00 return // Return it.\n" +
			"}\n"
	}

	// useEffect(() => {
	// 	ethereumManager.config(network);
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await ethereumManager.getBlocksFromNegativeIndex(0, 5)
	// 			setBlocks(response);
	// 		} catch (error) {
	// 			console.error('Error:', error);
	// 		}
	// 	};

	// 	// Fetch data initially
	// 	fetchData()
	// 	// Fetch data every five seconds
	// 	const intervalId = setInterval(fetchData, 5000);

	// 	// Clean up interval timer when component unmounts
	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// }, [network]);

	return (
		<Container fluid>
			{/* <Row>
				<Col>
					<ListGroup>
						{blocks.reverse().map((response, index) => {
							return (
								<ListGroup.Item key={index}>
									<BlockItem item={response.result} />
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>
				<Col>
					<ListGroup>
						{
							ethereumManager.extractLatestsTransactions(blocks, 5).map((tx, index) => {
								return (
									<ListGroup.Item key={index}>
										<TransactionItem item={tx} />
									</ListGroup.Item>
								);
							})
						}
					</ListGroup>
				</Col>
			</Row> */}
		</Container>
	);
}
