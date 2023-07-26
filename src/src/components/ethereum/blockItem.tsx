import { actualBlock } from "@/src/stateManager/blockSlice"
import { useAppDispatch } from "@/src/stateManager/hooks"
import * as settings from "@/src/settings"
import BlockNumber from "@/app/components/commons/BlockNumber"
import BlockNumberOfTx from "@/app/components/commons/BlockNumberOfTx"
import BlockFeeRecipient from "@/app/components/commons/BlockFeeRecipient"


export function BlockItem({ item }: { item: any }) {
    const dispatch = useAppDispatch()

    if (item.result) {
        return (
            <div>
                <a
                    href={`${settings.BLOCKDETAILSNUMBER_ROUTE}/${parseInt(item.result.number, 16)}`}
                >
                    <p>
                        <BlockNumber block={item.result} />
        
                        <BlockNumberOfTx block={item.result} />
    
                        <BlockFeeRecipient block={item.result} />
                    </p>
                </a>
            </div>
        )
    }
    return null
}