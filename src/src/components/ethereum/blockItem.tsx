
export function BlockItem({ item }: { item: any }) {
    if (item.result) {
        return (
            <div>
                <p>
                    <a 
                        href={`/blockexplorer/blockdetails/block/${parseInt(item.result.number, 16)}`}
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