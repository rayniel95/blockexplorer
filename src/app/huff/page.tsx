'use client'

import { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

let files = {
	"add.huff": "#define function add(uint256,uint256) nonpayable returns (uint256)\n" +
		"\n" +
		"#define macro MAIN() = {\n" +
		"   // Load our numbers from calldata and add them together.\n" +
		"   0x04 calldataload // [number1]\n" +
		"   0x24 calldataload // [number2]\n" +
		"   add               // [number1+number2]\n" +
		"   // Return our new number.\n" +
		"   0x00 mstore // Store our number in memory.\n" +
		"   0x20 0x00 return // Return it.\n" +
		"}\n"
}

/*
  const huffFileName = 'main.huff'
		const compiledHuff = compile({
		  files: {
			[huffFileName]: code,
		  },
		  sources: [huffFileName],
		})
		const { bytecode } = compiledHuff.contracts.get(huffFileName)
		loadInstructions(bytecode)
		startExecution(bytecode, _callValue, _callData)
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

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const compiledHuff = compile({
			files: {
				[huffFileName]: code,
			},
			sources: [huffFileName],
		})
		console.log(compiledHuff)
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
					<Form.Control as={'textarea'} value={code} onChange={(e) => setCode(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Text>Compiled contract: {bytecode}</Form.Text>
				</Form.Group>
				<Button variant="primary" type='submit'>Verify</Button>
			</Form>
		</Container>
	)
}


