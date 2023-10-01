'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'


// let compile: any = undefined
// async function loadCompile() {
// 	//@ts-ignore
// 	const huffc = await import("https://binaries.soliditylang.org/bin/soljson-v0.8.11+commit.d7f03943.js")
// 	compile = huffc.compile
// 	console.log(compile(input))
// }
// loadCompile()

const input = {
	language: 'Solidity',
	sources: {
		'test.sol': {
			content: 'contract C { function f() public { } }'
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*']
			}
		}
	}
};

// dynamicComponent.js
// import dynamic from 'next/dynamic';

// export function loadComponent(componentUrl) {
// 	//@ts-ignore
//   return dynamic(() => import("https://binaries.soliditylang.org/bin/soljson-v0.8.11+commit.d7f03943.js").then((mod) => console.log(mod.compile(input))), {});
// }

// loadComponent({});
/*
import dynamic from 'next/dynamic'

const DynamicFunction = dynamic(() =>
  import('https://example.com/script.js').then((mod) => mod.exportedFunction)
)

export default function Home() {
  // Use the dynamically imported function
  DynamicFunction();
  
  return (
	<div>
	  ...
	</div>
  )
}
*/
// loadCompile()
//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
//TODO - use script component to load wasm
export default function YulVerifier() {
	const [code, setCode] = useState('')
	const [address, setAddress] = useState('')
	const [addressBlock, setAddressBlock] = useState('')
	const [match, setMatch] = useState("")
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')
	const network = useAppSelector((state) => state.network.newtork);

	const handleWorkerMessage = useCallback(
		(event: MessageEvent) => {
			const { warning, error, contracts } = event.data

			if (error) {
				console.log(error, 'error')
				return
			}

			if (warning) {
				console.log(warning, 'warn')
			}

			console.log('Compilation successful')

			if (contracts.length > 1) {
				console.log(
					'The source should contain only one contract, Please select one to deploy.',
					'error',
				)
				return
			}
			console.log(contracts)
		},
		[],
	)

	useEffect(() => {
		const worker = new Worker(new URL('@/src/solcWorker.ts', import.meta.url))
		worker.postMessage({
			language: "Solidity",
			evmVersion: "london",
			source: 'contract C { function f() public { } }',
			solcVersion: "v0.1.1+commit.6ff4cd6"
		})
		worker.onmessage = handleWorkerMessage
		return () => {
			worker.terminate()
		}
	}, [])

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	return (
		<Container>
			<h5>Yul Verifier</h5>
			<Form onSubmit={verify}>
				<Form.Group className="mb-3">
					<Row>
						<Col>
							<Form.Label>Address</Form.Label>
							<Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
						</Col>
						<Col xs={2}>
							<Form.Label>At block</Form.Label>
							<Form.Control type="text" value={addressBlock} onChange={(e) => setAddressBlock(e.target.value)} />
						</Col>
					</Row>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Contract code</Form.Label>
					<Form.Control as={'textarea'} value={code} onChange={(e) => { setError(''); setBytecode(''); setMatch(""); setCode(e.target.value) }} />
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


