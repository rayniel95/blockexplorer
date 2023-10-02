'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import CompileInfo from '../components/CompileInfo'
import VerifierForm from '../components/VerifierForm'

export interface SolcVerifierProps {
	language: "Solidity" | "Yul"
}
//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
export default function SolcVerifier({ language }: SolcVerifierProps) {
	const [code, setCode] = useState('')
	const [address, setAddress] = useState('')
	const [addressBlock, setAddressBlock] = useState('')
	const [match, setMatch] = useState("")
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')
	const network = useAppSelector((state) => state.network.newtork);
	const solcWorkerRef = useRef<null | Worker>(null)

	const handleWorkerMessage = useCallback(
		(event: MessageEvent) => {
			const { warning, error, contracts } = event.data
			resetExecution()
			setContract(undefined)

			if (error) {
				log(error, 'error')
				setIsCompiling(false)
				return
			}

			if (warning) {
				log(warning, 'warn')
			}

			log('Compilation successful')

			if (contracts.length > 1) {
				setIsCompiling(false)
				log(
					'The source should contain only one contract, Please select one to deploy.',
					'error',
				)
				return
			}

			if (codeType === CodeType.Solidity) {
				setContract(contracts[0])
			}

			if (!isExpanded) {
				deployByteCode(contracts[0].code, '', undefined)
			} else {
				setIsCompiling(false)
			}
		},
		[resetExecution, log, codeType, isExpanded, deployByteCode],
	)

	useEffect(() => {
		if (solcWorkerRef && solcWorkerRef.current) {
			// @ts-ignore change the worker message, when value and args changed.
			solcWorkerRef.current?.onmessage = handleWorkerMessage
		}
	}, [solcWorkerRef, handleWorkerMessage])

	useEffect(() => {
		solcWorkerRef.current = new Worker(
			new URL('../../lib/solcWorker.js', import.meta.url),
		)
		solcWorkerRef.current.onmessage = handleWorkerMessage
		log('Solidity compiler loaded')

		return () => {
			if (solcWorkerRef?.current) {
				solcWorkerRef.current.terminate()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function verify(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	return (
		<>
			<VerifierForm />
		</>
	)
}


