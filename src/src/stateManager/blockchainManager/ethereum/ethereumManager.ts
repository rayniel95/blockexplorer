import { Alchemy, Network } from "alchemy-sdk";
import { INetworkManager } from "../../types";


export interface EthereumManagerConfig{
    apiKey: string;
    network: Network;
}

export class EthereumManager implements INetworkManager {
    configProp: EthereumManagerConfig;
    alchemy: Alchemy;
    constructor(config?: EthereumManagerConfig) {
        config? this.configProp = config : this.configProp = {
            apiKey: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_API_KEY,
            network: Network.ETH_MAINNET,
        };
        this.alchemy = new Alchemy(this.configProp);
    }
    config(config: EthereumManagerConfig) {
        this.configProp = config;
    }
    getApiKey(): string {
        return this.configProp.apiKey;
    }
    getAlchemy(): Alchemy {
        return this.alchemy;
    }
    getNetwork(): Network {
        return this.configProp.network;
    }
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
            `${this.getNetworkUrl()}/${this.getApiKey()}/`,
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