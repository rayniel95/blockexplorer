'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import CompileInfo, { CompileInfoProps } from './CompileInfo'


export interface VerifierFormProps extends CompileInfoProps{
    verifierName: string,
    verify: (e: React.FormEvent<HTMLFormElement>) => void,
}
//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
//TODO - use a library to create and validate the form
export default function VerifierForm({ verifierName, verify, error, compiledContractBytecode, match }: VerifierFormProps) {
	const [code, setCode] = useState('')
	const [address, setAddress] = useState('')
	const [addressBlock, setAddressBlock] = useState('')

	return (
		<Container>
			<h5>{verifierName} Verifier</h5>
			<Form onSubmit={verify}>
				<Form.Group className="mb-3">
					<Row>
						<Col>
							<Form.Label>Address</Form.Label>
							<Form.Control id='address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
						</Col>
						<Col xs={2}>
							<Form.Label>At block</Form.Label>
							<Form.Control id='addressBlock' type="text" value={addressBlock} onChange={(e) => setAddressBlock(e.target.value)} />
						</Col>
					</Row>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Contract code</Form.Label>
					<Form.Control id='code' as={'textarea'} value={code} onChange={(e) => setCode(e.target.value)} />
				</Form.Group>
				<CompileInfo error={error} compiledContractBytecode={compiledContractBytecode} match={match} />
				<Button variant="primary" type='submit'>Verify</Button>
			</Form>
		</Container>
	)
}