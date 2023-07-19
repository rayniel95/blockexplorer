'use client'

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import List from "./components/Lists";

function blockController(pageNumber: number) {
	return {
		itemsPerPage: 10,
		elementProps: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }, { item: 5 }, { item: 6 }, { item: 7 }, { item: 8 }, { item: 9 }, { item: 10 }],
		itemsCount: 20
	}
}

function Items({ item }) {
	return (
		<>
			<div>
				<p>Item #{item}</p>
			</div>
		</>
	);
}

export default function blockList() {
	return (
		<div>
			<List element={Items} controller={blockController} />
		</div>
	);
}
