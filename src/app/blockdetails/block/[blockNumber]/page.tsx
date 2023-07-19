'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import List from "./components/Lists";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/src/components/ethereum/blockItem";
import { useRouter } from "next/router";


const manager = new EthereumManager();


export default function BlockDetails() {
	const router = useRouter();
	const { blockNumber } = router.query;


	return (
		<div>
			here are the block {blockNumber} details
		</div>
	);
}
