'use client'

import { useState, useCallback } from "react";
import { AssetTransfersCategory } from "alchemy-sdk";
import { TransactionItem } from "@/app/components/commons/TransactionItem";
import InfiniteScroll from "react-infinite-scroller";
import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum";
//FIXME - use the link component from next instead a component. it add
// base path automatically

const itemsPerPage = 10

export default function AddressTransactionList({ addressNumber, from }: { addressNumber: string, from: boolean }) {
	//TODO - add links to address details and block details with hash and number
	const [items, setItems] = useState<any[]>([]);
	const [pageKey, setPageKey] = useState<string|undefined>(undefined)

	const hasMore = (pageKey == undefined && items.length == 0) || (pageKey != undefined && items.length > 0)

	async function fetchData() {
		const body: {
			category: AssetTransfersCategory[];
			maxCount: number;
			fromAddress: undefined|string;
			toAddress: undefined|string;
			pageKey: undefined|string;
		} = {
			category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL],
			maxCount: itemsPerPage,
			fromAddress: undefined,
			toAddress: undefined,
			pageKey: pageKey ? pageKey : undefined,
		}
		from ? body.fromAddress = addressNumber : body.toAddress = addressNumber
		try {
			const response = await ethereumManager.getAlchemy().core.getAssetTransfers(body);
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
