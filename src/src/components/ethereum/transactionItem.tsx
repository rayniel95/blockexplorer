import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

interface TxItemProps {
    tx: any
}

export function TransactionItem({ tx }: TxItemProps) {
    //FIXME - this doesnt work if there are multiple triggers in the same div
    //TODO - create multiple component with tooltips. them will be used in
    // multiple components
    return (
        <div>
            <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip id="tooltip-top-hash">
                        Transaction number: {tx.hash}
                    </Tooltip>
                }
            >
                <p>
                    Tx number: {`${tx.hash.toString().slice(0, 5)}...`}
                </p>
            </OverlayTrigger>
            <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip id="tooltip-top-from">
                        Transaction from: {tx.from}
                    </Tooltip>
                }
            >
                <Button variant="secondary">
                    Tx from: {`${tx.from.toString().slice(0, 5)}...`}
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip id="tooltip-top-to">
                        Transaction to: {tx.to}
                    </Tooltip>
                }
            >
                <Button variant="secondary">
                    Tx to: {`${tx.to.toString().slice(0, 5)}...`}
                </Button>
            </OverlayTrigger>
        </div>
    )
}