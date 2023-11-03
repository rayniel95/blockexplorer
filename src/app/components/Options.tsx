'use client'

import { Offcanvas, Stack } from 'react-bootstrap'
import Link from 'next/link'
import * as settings from '@/src/settings'


export interface OptionsProps {
    show: boolean,
    handleClose: () => void
}

export default function Options({
    show, handleClose
}: OptionsProps) {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack>
                        <Link href={`${settings.BLOCKLIST_ROUTE}`}>Blocks</Link>
                        <Link href={`${settings.VERIFIERS_ROUTE}`}>Verifiers</Link>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
