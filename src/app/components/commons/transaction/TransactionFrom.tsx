'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions, TransactionReceipt, TransactionResponse } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function TransactionFrom({ tx }: { tx: TransactionResponse }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Transaction from: {tx.hash}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-arrow-left-square"></i> {tx.hash.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
