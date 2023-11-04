'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useTimeDiff } from '@/src/stateManager/hooks';


export default function TransactionGasLimit({ tx }: { tx: TransactionResponse }) {
  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Transaction gas limit: {tx.gasLimit.toString()}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-fuel-pump-fill"></i> {tx.gasLimit.toString()}
        </p>
      </OverlayTrigger>
    </div>
  );
}
