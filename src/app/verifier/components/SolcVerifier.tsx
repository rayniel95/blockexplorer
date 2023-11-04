'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import VerifierForm from '../components/VerifierForm'
import { z } from 'zod'
import { VerifierSchema } from '../components/schemas/verifierSchema'


enum MatchType {
	Match = 'match',
	NoMatch = 'no match',
}

export interface SolcVerifierProps {
	language: "Solidity" | "Yul"
}

export default function SolcVerifier({ language }: SolcVerifierProps) {
	const [match, setMatch] = useState("")
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
				console.log(
					'The source should contain only one contract, Please select one to deploy.',
					'error',
				)
				return
			}
			console.log(contracts)
			console.log(contracts[0].code)
			console.log('address bytecode' + addressBytecode)
			const contractCode: string = contracts[0].code;
			addressBytecode.search(contractCode.slice(79, -88)) !== -1 ? setMatch("match") : setMatch("no match")
			setCompiledBytecode(contracts[0].code)
		},
		[addressBytecode],
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

	async function verify(e: z.infer<typeof VerifierSchema>) {
		ethereumManager.config(network)
		try {
			const bytecode = await ethereumManager.alchemy.core.getCode(e.contractAddress, e.blockNumber)
			console.log(bytecode)
			if (bytecode === '0x') {
				setError('Invalid address')
				setMatch("not match")
				return
			}
			setError('')
			setAddressBytecode(bytecode)

			solcWorkerRef.current!.postMessage({
				language: "Solidity",
				//TODO - allow to change the evm version
				evmVersion: "london",
				source: e.contractCode,
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
			<Container>
				{match ? <Alert className="mt-3" variant={match === 'match' ? 'success' : 'danger'}>
					{match === 'match' ? 'Match' : 'No match'}
				</Alert> : ""}
				<i className="bi bi-box-seam"> compiled contract:</i>
				<p className='text-break'>{compiledBytecode}</p>
			</Container>
		</>
	)
}