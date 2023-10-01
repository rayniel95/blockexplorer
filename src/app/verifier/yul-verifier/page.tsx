'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import CompileInfo from '../components/CompileInfo'
import VerifierForm from '../components/VerifierForm'


//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
export default function YulVerifier() {
	const [code, setCode] = useState('')
	const [address, setAddress] = useState('')
	const [addressBlock, setAddressBlock] = useState('')
	const [match, setMatch] = useState("")
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')
	const network = useAppSelector((state) => state.network.newtork);
	const solcWorkerRef = useRef<null | Worker>(null)

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	return (
		<>
			<VerifierForm />
		</>
	)
}


