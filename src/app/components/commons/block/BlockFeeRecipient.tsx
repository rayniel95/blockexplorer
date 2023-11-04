'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockFeeRecipient({ block }: { block: BlockWithTransactions }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block fee recipient: {block.miner}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-currency-bitcoin"></i> {block.miner.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
