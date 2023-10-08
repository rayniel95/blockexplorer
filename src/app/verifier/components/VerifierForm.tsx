import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import AddressField from "./AddressField";
import NumberField from "./NumberField";
import TextAreaField from "./TextAreaField";
import { AddressSchema } from "./schemas/addressSchema";
import { VerifierSchema } from "./schemas/verifierSchema";
import { Button } from "react-bootstrap";

// create the mapping
const mapping = [
  [AddressSchema, AddressField],
  [z.number(), NumberField],
  [z.string(), TextAreaField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const BaseVerifierForm = createTsForm(mapping);

export default function VerifierForm() {
  function onSubmit(data: z.infer<typeof VerifierSchema>) {
    // gets typesafe data when form is submitted
  }

  return (
    <BaseVerifierForm
      schema={VerifierSchema}
      onSubmit={onSubmit}
      renderAfter={() => <Button variant="primary" type='submit'>Verify</Button>}
      props={{
        contractAddress: {},
        blockNumber: {},
        contractCode: {}
      }}
    />
  );
}