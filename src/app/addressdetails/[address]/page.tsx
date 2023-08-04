'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import List from "@/app/components/commons/Lists"
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/app/components/commons/BlockItem";
import { alchemy } from "@/src/stateManager/blockchainManager/ethereum";
import { Utils } from "alchemy-sdk";
import AddressBalance from "./components/AddressBalance";
import AddressTransactionCount from "./components/AddressTransactionCount";
import Link from "next/link";
import * as settings from "@/src/settings";


const manager = new EthereumManager();

export default function AddressDetails({ params }: { params: { address: string } }) {
	const [balance, setBalance] = useState("");
	const [transactionCount, setTransactionCount] = useState(0);

	const { address } = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await alchemy.core.getBalance(address);
				const transactionCount = await alchemy.core.getTransactionCount(address);
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
		<div>
			<AddressBalance balance={balance} />
			<Link href={`${settings.TRANSACTIONLISTADDRESS_ROUTE}/${address}`}>
				<AddressTransactionCount transactionCount={transactionCount} />
			</Link>
		</div>
	);
}
