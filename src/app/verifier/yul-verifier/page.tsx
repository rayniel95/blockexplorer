'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import CompileInfo from '../components/CompileInfo'
import VerifierForm from '../components/VerifierForm'
import { z } from 'zod'
import { VerifierSchema } from '../components/schemas/verifierSchema'

export interface SolcVerifierProps {
	language: "Solidity" | "Yul"
}
//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
export default function SolcVerifier({ language }: SolcVerifierProps) {
	const [match, setMatch] = useState(false)
	const [compiledBytecode, setCompiledBytecode] = useState('')
	const [addressBytecode, setAddressBytecode] = useState('')
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
			solcWorkerRef.current.onmessage = handleWorkerMessage
		}
	}, [solcWorkerRef, handleWorkerMessage])

	useEffect(() => {
		solcWorkerRef.current = new Worker(
			new URL('@/src/solcWorker.ts', import.meta.url),
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

	function verify(e: z.infer<typeof VerifierSchema>) {
		ethereumManager.config(network)
		// e.preventDefault()
		console.log(e)
		try {
			Promise.all([
				new Promise((resolve: (value: Promise<string>)=>void, reject) => {
					const code = ethereumManager.alchemy.core.getCode(e.contractAddress, e.blockNumber);
					resolve(code)
				}),
				new Promise((resolve, reject) => {
					solcWorkerRef.current!.postMessage({
						language: language,
						//TODO - allow to change the evm version
						evmVersion: "london",
						//@ts-ignore
						source: e.target.code,
					})
					resolve({})
				}),
			]).then((values: [string, any]) => {
				console.log(values[0])
				if (values[0] === '0x') {
					setError('Invalid address')
					setMatch(false)
					return
				}
				setError('')
				setAddressBytecode(values[0])
				// setCompiledBytecode(values[1].contracts.get(huffFileName).runtime)
				// console.log(compiledBytecode)
				// console.log(values[0].search(compiledBytecode))
				// values[0].search(values[1].contracts.get(huffFileName).runtime) !== -1 ? setMatch("match") : setMatch("no match")
			})
		}
		catch (e: any) {
			console.log(e)
			setError(e.errors)
		}
	}

	return (
		<>
			<VerifierForm verifierName={language} verify={verify} />
		</>
	)
}


