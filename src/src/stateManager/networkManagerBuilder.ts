import { BlockItem as EthereumBlockItem } from "../components/ethereum/blockItem";
import { BlockItem as SolanaBlockItem } from "../components/solana/blockItem";
import { EthereumManager } from "./blockchainManager/ethereum/ethereumManager";
import { SolanaManager } from "./blockchainManager/solana/solanaManager";
import { IBlockItem, INetworkManager, Network } from "./types";
import React from "react";

//NOTE - this class can not be exported because it is singleton
class NetworkManagerBuilder{
    managers
    components
    constructor(){
        this.managers = {
           [Network.ETHEREUM] : new EthereumManager(),
           [Network.SOLANA]: new SolanaManager()
        }
        this.components = {
            [Network.ETHEREUM]: {
                blockItem: EthereumBlockItem
            },
            [Network.SOLANA]: {
                blockItem: SolanaBlockItem
            }
        }
    }
    getManager(network: Network): INetworkManager {
        return this.managers[network]
    }
    getBlockComponent(network: Network): IBlockItem {
        return this.components[network].blockItem
    }
}

const networkManagerBuilder = new NetworkManagerBuilder();
export default networkManagerBuilder