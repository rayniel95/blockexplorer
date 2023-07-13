import { alchemy } from ".";
import { INetworkManager } from "../../types";

export class EthereumManager implements INetworkManager {
    async getBlocks(start: number, end: number): Promise<Array<any>> {
        const reqs = []
        for (let i = 0; i < end - start; i++) {
            reqs.push({
                method: 'eth_getBlockByNumber',
                params: [`0x${(start + i).toString(16)}`, true],
                id: i + 1,
                jsonrpc: '2.0',
            })
        }

        const res = await fetch(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETHEREUM_API_KEY}`,
            { method: 'POST', body: JSON.stringify(reqs), headers: { 'Content-Type': 'application/json' } }
        )
        const result: Array<{ id: number }> = await res.json()
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
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        return await this.getBlocks(latestBlockNumber - end, latestBlockNumber - start)

    }
    async getLatestBlocks(cantity: number): Promise<Array<any>> {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const response = await this.getBlocks(latestBlockNumber - cantity, latestBlockNumber)
        return response
    }
    async getLatestTransactions(cantity: number): Promise<Array<any>> {
        const latestsBlocks = (await this.getLatestBlocks(cantity)).reverse();
        const transactions = []
        for (const block of latestsBlocks) {
            if (transactions.length + block.result.transactions.length < cantity) {
                transactions.push(...block.result.transactions)
            }
        }
        return transactions.slice(0, cantity)
    }
    extractLatestsTransactions(blocks: Array<any>, cantity: number): Array<any> {
        const transactions = []
        for (const block of blocks) {
            transactions.push(...block.result.transactions)
        }
        return transactions.slice(0, cantity)
    }
}