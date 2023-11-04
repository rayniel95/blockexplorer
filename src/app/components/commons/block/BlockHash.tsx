'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockFeeRecipient({ block }: { block: BlockWithTransactions }) {
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block hash: {block.hash}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-hash"></i> {block.hash.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
