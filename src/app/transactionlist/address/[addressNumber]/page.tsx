'use client'

import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import AddressTransactionList from "./components/AddressTransactionList";


export default function TransactionListFromToAddress({ params }: { params: { addressNumber: string } }) {
	const [from, setFrom] = useState(true)

	const { addressNumber } = params

	return (
		<div>
			<Container>
				<h4>
					Transactions { from ? "from" : "to" } {addressNumber}
				</h4>
				<Button onClick={() => setFrom(!from)}>
					<i className="bi bi-arrow-repeat"></i> { from ? "To" : "From" } address
				</Button>
			</Container>
			<Container>
				<AddressTransactionList key={from.toString()} addressNumber={addressNumber} from={from} />
			</Container>
		</div>
	);
}
