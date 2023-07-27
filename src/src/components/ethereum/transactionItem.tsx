import TransactionHash from "@/app/components/commons/transaction/TransactionHash";
import TransactionFrom from "@/app/components/commons/transaction/TxFrom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as settings from "@/src/settings"
import TransactionTo from "@/app/components/commons/transaction/TxTo";
import { TransactionResponse } from "alchemy-sdk";
import Link from "next/link";


export function TransactionItem({ item }: { item: TransactionResponse }) {
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