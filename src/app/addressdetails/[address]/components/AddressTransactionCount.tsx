'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function AddressTransactionCount({ transactionCount }: { transactionCount: number }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Address transaction count: {transactionCount}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-wallet2"></i> {transactionCount.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
