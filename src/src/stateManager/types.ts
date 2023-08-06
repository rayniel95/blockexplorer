
export enum Network {
    ETHEREUM,
    POLKADOT,
    ARBITRUM,
    NEAR,
    STARKNET,
    POLYGON,
    SOLANA,
}

export function isValidNetwork(value: number): value is Network {
    return (value as number) in Network;
}

export interface INetworkManager{
    getBlocks(start: number, end: number): Promise<Array<any>>
    getLatestTransactions(start: number, end: number): Promise<Array<any>>
    getBlocksFromNegativeIndex(start: number, end: number): Promise<Array<any>>
    getLatestBlocks(cantity: number): Promise<Array<any>>
}
