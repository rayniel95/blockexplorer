'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BigNumber, BlockWithTransactions, TransactionReceipt, TransactionResponse } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {Utils} from 'alchemy-sdk';


export default function TransactionValue({ tx }: { tx: TransactionResponse }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Transaction value: {Utils.formatEther(tx.value.toString()).toString()} ETH
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-coin"></i> {tx.value.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
