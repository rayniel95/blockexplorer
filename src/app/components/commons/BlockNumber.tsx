'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockNumber({ block }: { block: BlockWithTransactions }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block number: {parseInt(block.number.toString(), 16)}
          </Tooltip>
        }
      >
        <p>
          #: {`${block.number.toString().slice(0, 5)}...`}
        </p>
      </OverlayTrigger>
    </div>
  );
}
