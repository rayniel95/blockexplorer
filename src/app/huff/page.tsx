'use client'

import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

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
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try{
			const compiledHuff = compile({
				files: {
					[huffFileName]: code,
				},
				sources: [huffFileName],
			})
			setBytecode(compiledHuff.contracts.get(huffFileName).bytecode)
		}
		catch (e){
			console.log(e)
			setError(e.errors)
		}
	}

	return (
		<Container>
			<h5>Huff Verifier</h5>
			<Form onSubmit={verify}>
				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Contract code</Form.Label>
					<Form.Control as={'textarea'} value={code} onChange={(e) => {setError(''); setBytecode(''); setCode(e.target.value)}} />
				</Form.Group>
				<Form.Group>
					{
						error? <Form.Text>{error}</Form.Text>: <Form.Text>Compiled contract: {bytecode}</Form.Text>
					}
				</Form.Group>
				<Button variant="primary" type='submit'>Verify</Button>
			</Form>
		</Container>
	)
}


