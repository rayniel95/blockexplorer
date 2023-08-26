'use client'

import { ethereumManager } from "@/src/stateManager/blockchainManager/ethereum"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"


function checkValidHash(input: string): boolean {
    return /^0x([A-Fa-f0-9]{64})$/.test(input)
}

function checkAddress(input: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(input)
}

function checkBlockNumber(input: string):boolean{
    return /^\d+$/.test(input)
}

//TODO - refactor this 
export function Searcher() {
    const [isValidSearch, setIsValidSearch] = useState(true)
    const [input, setInput] = useState('')
    const router = useRouter()

    function search(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        if (checkValidHash(input)) {
            setIsValidSearch(true)
            ethereumManager.alchemy.core.getBlock(input).then(
                (block) => {                    
                    block && router.push(`/blockdetails/block-hash/${input}`)
                }
            )
            ethereumManager.alchemy.core.getTransaction(input).then(
                (transaction) => {
                    transaction && router.push(`/transactiondetails/transaction-hash/${input}`)
                }
            )
        } else if (checkAddress(input)) {
            setIsValidSearch(true)
            router.push(`/addressdetails/${input}`)
        } else if (checkBlockNumber(input)) {
            setIsValidSearch(true)
            router.push(`/blockdetails/block-number/${input}`)
        } else {
            setIsValidSearch(false)
        }
    }

    return (
        <Form className="d-flex" onSubmit={search}>
            <Form.Control
                type="search"
                placeholder="tx hash/address/block number/block hash"
                className="me-2"
                aria-label="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            {!isValidSearch && <Form.Text className="text-muted">
                It is a not a valid address, hash or block number.
            </Form.Text>}
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
    )
}