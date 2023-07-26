'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import List from "./components/Lists";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/src/components/ethereum/blockItem";
import { Form, Button } from "react-bootstrap";


const manager = new EthereumManager();

export default function HuffVerifier() {

	useEffect(() => {
		const fetchData = async () => {
			try {
				
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
		<div>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicAddress">
					<Form.Label>Contract address</Form.Label>
					<Form.Control type="text" placeholder="Enter contract address" />
					<Form.Text className="text-muted">
						This is the address of the contract to be verified
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicContractCode">
					<Form.Label>Contract Code</Form.Label>
					<Form.Control as="textarea" rows={3} />
				</Form.Group>
				<Button variant="primary" type="submit">
					verify
				</Button>
			</Form>
		</div>
	);
}
