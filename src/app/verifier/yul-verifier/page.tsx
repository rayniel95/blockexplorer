'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'


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


