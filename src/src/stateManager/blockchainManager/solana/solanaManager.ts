import { INetworkManager } from "../../types";

export class SolanaManager implements INetworkManager {
    async getLatestBlockNumber(): Promise<number> {
        const reqs = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBlockHeight",
            "params": [{commitment: 'finalized'}]
        }
        const res = await fetch(
            `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SOLANA_API_KEY}`,
            { method: 'POST', body: JSON.stringify(reqs), headers: { 'Content-Type': 'application/json', 'accept': 'application/json' } }
        )
        const result = (await res.json()).result
        return result
    }
    async getBlocks(start: number, end: number): Promise<Array<any>> {
        const reqs = []
        for (let i = 0; i < end - start; i++) {
            reqs.push({
                method: 'getBlock',
                params: [start+i, {"encoding": "json","transactionDetails":"full","rewards":true, "maxSupportedTransactionVersion": 0}],
                id: i+1,
                jsonrpc: '2.0',
            })
        }
        const res = await fetch(
            `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETHEREUM_API_KEY}`,
            { method: 'POST', body: JSON.stringify(reqs), headers: { 'Content-Type': 'application/json' } }
        )
        const result: Array<{id:number}> = await res.json()
        result.sort((a, b) => a.id - b.id)
        return result
    }
    /**
     * Retrieves a range of blocks from a negative index.
     *
     * @param {number} start - The starting negative index.
     * @param {number} end - The ending negative index.
     * @return {Promise<Array<any>>} - An array of blocks within the specified range.
     */
    async getBlocksFromNegativeIndex(start: number, end: number): Promise<Array<any>> {
        const latestBlock = await this.getLatestBlockNumber()
        const result = await this.getBlocks(latestBlock - end, latestBlock - start)
        // console.log(result)
        return result
    }
    async getLatestBlocks(cantity: number): Promise<Array<any>> {
        throw new Error("Method not implemented.");
        
    }
    getTransactions(start: number, end: number): Promise<Array<any>> {
        throw new Error("Method not implemented.");
    }
}