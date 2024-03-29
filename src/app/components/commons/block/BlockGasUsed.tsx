'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockGasUsed({ block }: { block: BlockWithTransactions }) {
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block gas used: {parseInt(block.gasUsed.toString(), 16)}
          </Tooltip>
        }
      >
        <p>
        <i className="bi bi-fuel-pump-fill"></i> {block.gasUsed.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
