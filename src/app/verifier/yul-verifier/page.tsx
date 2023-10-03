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
	const [match, setMatch] = useState(false)
	const [bytecode, setBytecode] = useState('')
	const [error, setError] = useState('')
	const network = useAppSelector((state) => state.network.newtork);
	const solcWorkerRef = useRef<null | Worker>(null)

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
				// setIsCompiling(false)
				console.log(
					'The source should contain only one contract, Please select one to deploy.',
					'error',
				)
				return
			}
			console.log(contracts)
			// if (codeType === CodeType.Solidity) {
			// 	setContract(contracts[0])
			// }

			// if (!isExpanded) {
			// 	deployByteCode(contracts[0].code, '', undefined)
			// } else {
			// 	setIsCompiling(false)
			// }
		},
		[],
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
		console.log('Solidity compiler loaded')

		return () => {
			if (solcWorkerRef?.current) {
				solcWorkerRef.current.terminate()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function verify(e: React.FormEvent<HTMLFormElement>) {
		ethereumManager.config(network)
		e.preventDefault()
		try {
			Promise.all([
				new Promise((resolve, reject) => {
					resolve(ethereumManager.alchemy.core.getCode(address))
				}),
				new Promise((resolve, reject) => {
					const compiledHuff = compile({
						files: {
							[huffFileName]: code,
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
				setBytecode(values[1].contracts.get(huffFileName).runtime)
				console.log(bytecode)
				console.log(values[0].search(bytecode))
				values[0].search(values[1].contracts.get(huffFileName).runtime) !== -1 ? setMatch("match") : setMatch("no match")
			})
		}
		catch (e) {
			console.log(e)
			setError(e.errors)
		}
	}

	return (
		<>
			<VerifierForm />
		</>
	)
}


