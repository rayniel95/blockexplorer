'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockGasUsed({ block }: { block: BlockWithTransactions }) {
  //TODO - add color themes. research about it
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
        <i className="bi bi-fuel-pump-fill"></i> {`${block.gasUsed.toString().slice(0, 5)}...`}
        </p>
      </OverlayTrigger>
    </div>
  );
}
