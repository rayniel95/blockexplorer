'use client'

import { useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { Utils } from "alchemy-sdk";
import AddressBalance from "./components/AddressBalance";
import AddressTransactionCount from "./components/AddressTransactionCount";
import Link from "next/link";
import * as settings from "@/src/settings";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";


export default function AddressDetails({ params }: { params: { address: string } }) {
	const [balance, setBalance] = useState("");
	const [transactionCount, setTransactionCount] = useState(0);

	const { address } = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await ethereumManager.getAlchemy().core.getBalance(address);
				const transactionCount = await ethereumManager.getAlchemy().core.getTransactionCount(address);
				setBalance(Utils.formatEther(response));
				setTransactionCount(transactionCount);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// Fetch data initially
		fetchData()
	}, []);

	return (
		<>
			<h4>Address details</h4>
			<AddressBalance balance={balance} />
			<Link href={`${settings.TRANSACTIONLISTADDRESS_ROUTE}/${address}`}>
				<AddressTransactionCount transactionCount={transactionCount} />
			</Link>
		</>
	);
}
