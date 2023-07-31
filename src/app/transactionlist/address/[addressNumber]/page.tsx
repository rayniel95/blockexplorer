'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { EthereumManager } from "@/src/stateManager/blockchainManager/ethereum/ethereumManager";
import { BlockItem } from "@/src/components/ethereum/blockItem";
import { alchemy } from "@/src/stateManager/blockchainManager/ethereum";
import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";
import List from "@/app/components/commons/Lists";
import InfiniteScroll from "react-infinite-scroller";
import { TransactionItem } from "@/src/components/ethereum/transactionItem";
import Link from "next/link";
import * as settings from "@/src/settings";


const manager = new EthereumManager();
const itemsPerPage = 10

//TODO - type this
export default function AddressTransactionList({ params }: { params: { addressNumber: string } }) {
	const [items, setItems] = useState([]);
	const [pageKey, setPageKey] = useState(undefined)

	const { addressNumber } = params
	const hasMore = (pageKey == undefined && items.length == 0) || (pageKey != undefined && items.length > 0)

	async function fetchData() {
		try {
			const response = await alchemy.core.getAssetTransfers({
				category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL],
				fromAddress: addressNumber,
				maxCount: itemsPerPage,
				pageKey: pageKey ? pageKey : undefined,
			});
			setItems(items.concat(response.transfers))
			setPageKey(response.pageKey)
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<div style={{ height: "700px", overflow: "auto" }}>
			<InfiniteScroll
				loadMore={fetchData}
				hasMore={hasMore}
				loader={<h4 key={-1}>Loading...</h4>} //TODO - use a loader icon
				pageStart={0}
				useWindow={false}
			>
				{
					items.map(
						(item) => (
							<TransactionItem item={item} key={item.hash} />
						)
					)
				}
			</InfiniteScroll>
		</div>
	);
}
