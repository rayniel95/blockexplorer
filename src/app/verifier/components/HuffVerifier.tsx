'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import VerifierForm from '../components/VerifierForm'
import { z } from 'zod'
import { VerifierSchema } from '../components/schemas/verifierSchema'

//TODO - use script component to load the wasm
let compile: any = undefined
async function loadCompile() {
    const huffc = await import("../../../src/huff-bundler/huffc")
    compile = huffc.compile
}

loadCompile()
//TODO - merge all verifers in a single page
const huffFileName = 'main.huff'
//TODO - split this in two components or use a component state machine
export default function HuffVerifier() {
    const [match, setMatch] = useState("")
	const [compiledBytecode, setCompiledBytecode] = useState('')
    const [error, setError] = useState('')
    const network = useAppSelector((state) => state.network.newtork);


	function verify(e: z.infer<typeof VerifierSchema>) {
        ethereumManager.config(network)
        try {
            Promise.all([
                new Promise((resolve: (value: Promise<string>) => void, reject) => {
                    resolve(ethereumManager.alchemy.core.getCode(e.contractAddress, e.blockNumber))
                }),
                new Promise((resolve, reject) => {
                    const compiledHuff = compile({
                        files: {
                            [huffFileName]: e.contractCode,
                        },
                        sources: [huffFileName],
                    })
                    console.log(compiledHuff)
                    resolve(compiledHuff)
                }),
            ]).then((values: [string, any]) => {
                console.log(values[0])
                if (values[0] === '0x') {
                    setError('Invalid address')
                    setMatch("")
                    return
                }
                setError('')
                setCompiledBytecode(values[1].contracts.get(huffFileName).runtime)
                values[0].search(values[1].contracts.get(huffFileName).runtime) !== -1 ? setMatch("match") : setMatch("no match")
            })
        }
        catch (e: any) {
            console.log(e)
            setError(e.errors)
        }
    }

    return (
        <>
            <VerifierForm verifierName={"HuffVerifier"} verify={verify} />
            {match ? <Alert className="mt-3" variant={match === 'match' ? 'success' : 'danger'}>
                {match === 'match' ? 'Match' : 'No match'}
            </Alert> : ""}
            <p>
                <i className="bi bi-box-seam"></i> compiled contract: {compiledBytecode}
            </p>
        </>
        // <Container>
        // 	<h5>Huff Verifier</h5>
        // 	<Form onSubmit={verify}>
        // 		<Form.Group className="mb-3">
    )
}


