'use client'

import { NavDropdown } from "react-bootstrap"
import { useState } from "react"

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
        </NavDropdown>
    )
}