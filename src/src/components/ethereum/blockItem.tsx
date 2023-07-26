import { actualBlock } from "@/src/stateManager/blockSlice"
import { useAppDispatch } from "@/src/stateManager/hooks"
import * as settings from "@/src/settings"


export function BlockItem({ item }: { item: any }) {
    const dispatch = useAppDispatch()

    if (item.result) {
        return (
            <div>
                <p>
                    <a 
                        // onClick={()=>dispatch(actualBlock(item.result))}
                        href={`${settings.BLOCKDETAILSNUMBER_ROUTE}${parseInt(item.result.number, 16)}`}
                    >
                        Block number: {parseInt(item.result.number, 16)}
                    </a>
                </p>
                <p>
                    Number of tx: {item.result.transactions.length}
                </p>
                <p>
                    Fee recipient: {item.result.miner}
                </p>
            </div>
        )
    }
    return null
}