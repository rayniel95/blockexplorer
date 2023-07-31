'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockWithTransactionData } from "ethereum-types";
import { BlockWithTransactions } from "alchemy-sdk";
import BlockNumber from "@/app/components/commons/block/BlockNumber";
import BlockTimestamp from "@/app/components/commons/block/BlockTimestamp";
import BlockNumberOfTx from "@/app/components/commons/block/BlockNumberOfTx";
import BlockFeeRecipient from "@/app/components/commons/block/BlockFeeRecipient";
import Link from "next/link";
import * as settings from "@/src/settings"
import BlockDifficulty from "@/app/components/commons/block/BlockDifficulty";
import BlockGasUsed from "@/app/components/commons/block/BlockGasUsed";
import BlockExtraData from "@/app/components/commons/block/BlockExtraData";
import BlockHash from "@/app/components/commons/block/BlockHash";
import BlockSize from "@/app/components/commons/block/BlockSize";
//FIXME - use the link component from next instead a component. it add
// base path automatically

export default function BlockDetails({ block }: { block: BlockWithTransactions }) {
	return (
		<div>
			<BlockNumber block={block} />
			<BlockHash block={block} />
			<BlockTimestamp block={block} />
			<Link href={`${settings.TRANSACTIONLISTBLOCK_ROUTE}/${parseInt(block.number.toString(), 16)}`}>
				<BlockNumberOfTx block={block} />
			</Link>
			<Link href={`${settings.ADDRESSDETAILS_ROUTE}/${block.miner}`}>
				<BlockFeeRecipient block={block} />
			</Link>
			<BlockGasUsed block={block} />
			<BlockExtraData block={block} />
		</div>
	);
}
