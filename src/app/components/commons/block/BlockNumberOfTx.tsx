'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockNumberOfTx({ block }: { block: BlockWithTransactions }) {
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Number of transactions: {block.transactions.length}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-list-stars"></i> {block.transactions.length}
        </p>
      </OverlayTrigger>
    </div>
  );
}
