'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";



export default function BlockSize({ block }: { block: BlockWithTransactions }) {
  //TODO - add color themes. research about it
  const extractedValues = Object.entries(block).map(([key, value]) => (
    value
  ));
  const blockSize = new TextEncoder().encode(extractedValues.toString()).byteLength;

  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block size: {blockSize}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-hdd-stack-fill"></i> {`${blockSize} bytes`}
        </p>
      </OverlayTrigger>
    </div>
  );
}
