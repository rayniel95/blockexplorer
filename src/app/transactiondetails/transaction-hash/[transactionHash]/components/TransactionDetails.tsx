'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData } from "ethereum-types";
import { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import BlockNumber from "@/app/components/commons/block/BlockNumber";
import Link from "next/link";
import * as settings from "@/src/settings"
import TransactionHash from "@/app/components/commons/transaction/TransactionHash";
import TransactionFrom from "@/app/components/commons/transaction/TransactionFrom";
import TransactionTo from "@/app/components/commons/transaction/TransactionTo";
import TransactionValue from "@/app/components/commons/transaction/TransactionValue";
import TransactionGasLimit from "@/app/components/commons/transaction/TransactionGasLimit";
//FIXME - use the link component from next instead a component. it add
// base path automatically

export default function TransactionDetails({ tx }: { tx: TransactionResponse }) {
	//TODO - add links to address details and block details with hash and number
	return (
		<div>
			<TransactionHash tx={tx} />
			<Link href={settings.BLOCKDETAILSNUMBER_ROUTE + "/" + tx.blockNumber}>
				<BlockNumber block={{ number: tx.blockNumber } as BlockWithTransactions} />
			</Link>
			<TransactionValue tx={tx} />
			<Link href={settings.TRANSACTIONDETAILS_ROUTE + "/" + tx.from}>
				<TransactionFrom tx={tx} />
			</Link>
			<Link href={settings.TRANSACTIONDETAILS_ROUTE + "/" + tx.to}>
				<TransactionTo tx={tx} />
			</Link>
			<TransactionGasLimit tx={tx} />
		</div>
	);
}
