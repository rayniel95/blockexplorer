'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function BlockDifficulty({ block }: { block: BlockWithTransactions }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block difficulty: {block.difficulty}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-database-fill-check"></i> {block.difficulty.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
