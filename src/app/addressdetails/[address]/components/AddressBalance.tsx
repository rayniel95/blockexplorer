'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default function AddressBalance({ balance }: { balance: string }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Address balance: {balance} ETH
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-piggy-bank-fill"></i> {balance.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
