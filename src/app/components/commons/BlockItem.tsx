import { actualBlock } from "@/src/stateManager/blockSlice"
import { useAppDispatch } from "@/src/stateManager/hooks"
import * as settings from "@/src/settings"
import BlockNumber from "@/app/components/commons/block/BlockNumber"
import BlockNumberOfTx from "@/app/components/commons/block/BlockNumberOfTx"
import BlockFeeRecipient from "@/app/components/commons/block/BlockFeeRecipient"
import { BlockWithTransactions } from "alchemy-sdk"
import Link from "next/link"

//TODO - refactor this 
export function BlockItem({ item }: { item: BlockWithTransactions }) {
    if (item) {
        return (
            <div>
                <Link
                    href={`${settings.BLOCKDETAILSNUMBER_ROUTE}/${parseInt(item.number.toString(), 16)}`}
                >
                    <BlockNumber block={item} />

                    <BlockNumberOfTx block={item} />

                    <BlockFeeRecipient block={item} />
                </Link>
            </div>
        )
    }
    return null
}