'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData } from "ethereum-types";
import { BlockWithTransactions } from "alchemy-sdk";


export default function BlockDetails({block}: {block: BlockWithTransactions}) {
	return (
		<div>
			here are the block {block.number} details

			<p>{JSON.stringify(block)}</p>
		</div>
	);
}
