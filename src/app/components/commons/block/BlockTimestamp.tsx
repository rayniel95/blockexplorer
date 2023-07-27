'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BlockWithTransactions } from "alchemy-sdk";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useState, useEffect } from 'react';


export default function BlockTimestamp({ block }: { block: BlockWithTransactions }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeDiff = `${Math.floor((currentTime.getTime()/1000 - block.timestamp)/60)} minutes ago`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //TODO - add color themes. research about it
  return (
    <div>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id="tooltip-top-hash">
            Block timestamp: {`${timeDiff} (${new Date(block.timestamp * 1000)})`}
          </Tooltip>
        }
      >
        <p>
          <i className="bi bi-alarm"></i> {timeDiff}
        </p>
      </OverlayTrigger>
    </div>
  );
}
