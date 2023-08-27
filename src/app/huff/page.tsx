'use client'

import {useEffect} from 'react'
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

export default function Index() {

	useEffect(() => {
		async function fetchModule(){
			const {compile} = await import("../../src/huff-bundler/huffc")
			console.log(compile({
				files,
				sources: ['add.huff']
			}))
		}
		fetchModule()
	}, [])

	return (
		<Container>
			<h5>Huff Verifier</h5>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control type="text" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Contract code</Form.Label>
					<Form.Control as={'textarea'} />
				</Form.Group>
				<Button variant="primary" type='submit'>Verify</Button>
			</Form>
		</Container>
	)
}


