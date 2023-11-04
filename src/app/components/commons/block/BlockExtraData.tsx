'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


const hexToAscii = (hex: string) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const asciiCode = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(asciiCode);
  }
  return str;
};

export default function BlockExtraData({ block }: { block: BlockWithTransactions }) {
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block extra data: {`${hexToAscii(block.extraData)} (${block.extraData})`}
          </Tooltip>
        }
      >
        <p>
        <i className="bi bi-clipboard-data"></i> {block.extraData.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
