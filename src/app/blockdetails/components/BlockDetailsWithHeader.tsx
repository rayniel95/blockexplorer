'use client'

import { BlockWithTransactions } from "alchemy-sdk";
import BlockDetails from "./BlockDetails";


export default function BlockDetailsWithHeader({ block }: { block: BlockWithTransactions }) {
	return (
		<>
			<h4>Block details</h4>
			{block.number && <BlockDetails block={block} />}
		</>
	);
}
