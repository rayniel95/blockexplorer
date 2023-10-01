'use client'

import { ethereumManager } from '@/src/stateManager/blockchainManager/ethereum'
import { useAppSelector } from '@/src/stateManager/hooks'
import Script from 'next/script'
import { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'


export interface CompileInfoProps {
    error: string,
    compiledContractBytecode: string,
    match: boolean
}
//TODO - merge all verifers in a single page
//TODO - split this in two components or use a component state machine
export default function CompileInfo({ error, compiledContractBytecode, match }: CompileInfoProps) {
    const matchString = match ? 'match' : 'no match'

    return (
        <>
            <Form.Group>
                {
                    error ? <Form.Text>{error}</Form.Text> : <Form.Text>{matchString}, compiled contract: {compiledContractBytecode}</Form.Text>
                }
            </Form.Group>
        </>
    )
}
