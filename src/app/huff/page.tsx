'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

/*
#define function add(uint256,uint256) nonpayable returns (uint256)
	#define macro MAIN() = {
	// Load our numbers from calldata and add them together.
	   0x04 calldataload // [number1]
	   0x24 calldataload // [number2]
	   add               // [number1+number2]
	   // Return our new number.\n" +
	   0x00 mstore // Store our number in memory.
		0x20 0x00 return // Return it.
	}
*/
let compile: any = undefined
async function loadCompile() {
	const huffc = await import("../../src/huff-bundler/huffc")
	compile = huffc.compile
}

loadCompile()

const huffFileName = 'main.huff'

export default function HuffVerifier() {
	const [code, setCode] = useState('')
	const [address, setAddress] = useState('')
	const [addressBlock, setAddressBlock] = useState('')
	const [match, setMatch] = useState("match")
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			Promise.all([
				ethereumManager.alchemy.core.getCode(address, parseInt(addressBlock)),
				new Promise((resolve, reject) => {
					const compiledHuff = compile({
						files: {
							[huffFileName]: code,
						},
						sources: [huffFileName],
					})
					setBytecode(compiledHuff.contracts.get(huffFileName).bytecode)
				}),
			]).then((values) => {
				if (values[0] === '0x'){
					setError('Invalid address')
					return
				}
				values[0].search(bytecode)? setMatch("match") : setMatch("no match")
			})
		}
		catch (e) {
			console.log(e)
			setError(e.errors)
		}
	}

	return (
		<Container>
			<h5>Huff Verifier</h5>
			<Form onSubmit={verify}>
				<Form.Group className="mb-3">
					<Row>
						<Col>
							<Form.Label>Address</Form.Label>
							<Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
						</Col>
						<Col>
							<Form.Label>At block</Form.Label>
							<Form.Control type="text" value={addressBlock} onChange={(e) => setAddressBlock(e.target.value)} />
						</Col>
					</Row>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Contract code</Form.Label>
					<Form.Control as={'textarea'} value={code} onChange={(e) => { setError(''); setBytecode(''); setCode(e.target.value) }} />
				</Form.Group>
				<Form.Group>
					{
						error ? <Form.Text>{error}</Form.Text> : <Form.Text>{match}, compiled contract: {bytecode}</Form.Text>
					}
				</Form.Group>
				<Button variant="primary" type='submit'>Verify</Button>
			</Form>
		</Container>
	)
}


