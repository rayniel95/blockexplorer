import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import AddressField from "./AddressField";
import NumberField from "./NumberField";
import TextAreaField from "./TextAreaField";
import { AddressSchema } from "./schemas/addressSchema";
import { VerifierSchema } from "./schemas/verifierSchema";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

// create the mapping
const mapping = [
  [AddressSchema, AddressField],
  [z.number(), NumberField],
  [z.string(), TextAreaField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const BaseVerifierForm = createTsForm(mapping);

export interface VerifierFormProps {
  verifierName: string;
  verify: (data: z.infer<typeof VerifierSchema>) => void;
}

export default function VerifierForm({ verifierName, verify }: VerifierFormProps) {
  // function onSubmit(data: z.infer<typeof VerifierSchema>) {
  //   // gets typesafe data when form is submitted
  // }

  return (
    <BaseVerifierForm
      schema={VerifierSchema}
      onSubmit={verify}
      renderAfter={() => <Button variant="primary" type='submit'>Verify</Button>}
      props={{
        contractAddress: {},
        blockNumber: {},
        contractCode: {}
      }}
    >
      {({ contractAddress, blockNumber, contractCode }) => {
        return (
          <Container>
            <h5>{verifierName} verifier</h5>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  {contractAddress}
                </Col>
                <Col xs={2}>
                  {blockNumber}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              {contractCode}
            </Form.Group>
          </Container>
        );
      }}
    </BaseVerifierForm>
  );
}