import TransactionHash from "@/app/components/commons/transaction/TransactionHash";
import TransactionFrom from "@/app/components/commons/transaction/TransactionFrom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as settings from "@/src/settings"
import TransactionTo from "@/app/components/commons/transaction/TransactionTo";
import { TransactionResponse } from "alchemy-sdk";
import Link from "next/link";

//TODO - reestructure this 
export function TransactionItem({ item }: { item: TransactionResponse }) {
    return (
        <div className="text-truncate">
            <Link
                href={`${settings.TRANSACTIONDETAILS_ROUTE}/${item.hash}`}
            >
                <TransactionHash tx={item} />
                <TransactionFrom tx={item} />
                <TransactionTo tx={item} />
            </Link>
        </div>
    )
}