import { actualBlock } from "@/src/stateManager/blockSlice"
import { useAppDispatch } from "@/src/stateManager/hooks"
import * as settings from "@/src/settings"
import BlockNumber from "@/app/components/commons/block/BlockNumber"
import BlockNumberOfTx from "@/app/components/commons/block/BlockNumberOfTx"
import BlockFeeRecipient from "@/app/components/commons/block/BlockFeeRecipient"
import { BlockWithTransactions } from "alchemy-sdk"
import Link from "next/link"


export function BlockItem({ item }: { item: BlockWithTransactions }) {
    if (item) {
        return (
            <div>
                <Link
                    href={`${settings.BLOCKDETAILSNUMBER_ROUTE}/${parseInt(item.number.toString(), 16)}`}
                >
                    <p>
                        <BlockNumber block={item.result} />
        
                        <BlockNumberOfTx block={item.result} />
    
                        <BlockFeeRecipient block={item.result} />
                    </p>
                </a>
                </Link>
            </div>
        )
    }
    return null
}