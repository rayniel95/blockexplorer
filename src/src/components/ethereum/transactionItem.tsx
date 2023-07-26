import TransactionHash from "@/app/components/commons/TransactionHash";
import TransactionFrom from "@/app/components/commons/TxFrom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as settings from "@/src/settings"
import TransactionTo from "@/app/components/commons/TxTo";

interface TxItemProps {
    tx: any
}

export function TransactionItem({ tx }: TxItemProps) {
    //FIXME - this doesnt work if there are multiple triggers in the same div
    //TODO - create multiple component with tooltips. them will be used in
    // multiple components
    return (
        <div>
            <a
                href={`${settings.TRANSACTIONDETAILS_ROUTE}/${tx.hash}`}
            >
                <TransactionHash tx={tx} />
                <TransactionFrom tx={tx} />
                <TransactionTo tx={tx} />
            </a>
        </div>
    )
}