import { BlockItemProps } from "@/src/stateManager/types";

export function BlockItem({ block }: BlockItemProps) {
    return (
        <div>
            <p>
                Block number: {parseInt(block.result.number, 16)}
            </p>
            <p>
                Number of tx: {block.result.transactions.length}
            </p>
            <p>
                Fee recipient: {block.result.miner}
            </p>
        </div>
    )
}