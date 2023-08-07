'use client'

import { Network } from "alchemy-sdk"
import { changeNetwork } from "@/src/stateManager/networkSlice"
import { NavDropdown } from "react-bootstrap"
import { useState } from "react"
import { useAppDispatch } from "@/src/stateManager/hooks"

//TODO - refactor this 
export function NetworkSwitcher({id, actionForNetwork, defaultNetwork}: {id: string, actionForNetwork: Record<string, () => void>, defaultNetwork: string}) {
    const [network, setNetwork] = useState(defaultNetwork);
    // const dispatch = useAppDispatch()

    function updateNetwork(network: string) {
        setNetwork(network)
        actionForNetwork[network]()
    }

    return (
        <NavDropdown
            title={network}
            id={id}
        >
            {Object.keys(actionForNetwork).map((key) => {
                return (
                    <NavDropdown.Item key={key} onClick={() => updateNetwork(key)}>
                        {key}
                    </NavDropdown.Item>
                )
            })}
            {/* <NavDropdown.Item href="" onClick={(e) => dispatch(changeNetwork(Network.ETH_MAINNET))}>
                Ethereum Mainnet
            </NavDropdown.Item>
            <NavDropdown.Item href="" onClick={(e) => dispatch(changeNetwork(Network.ETH_SEPOLIA))}>
                Sepolia
            </NavDropdown.Item> */}
        </NavDropdown>
    )
}