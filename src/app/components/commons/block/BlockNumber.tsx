'use client'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BlockWithTransactions } from "alchemy-sdk";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export default function BlockNumber({ block }: { block: BlockWithTransactions }) {
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
          <i className="bi bi-boxes"></i> {block.number.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
