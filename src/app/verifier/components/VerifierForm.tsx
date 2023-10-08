import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import AddressField from "./AddressField";
import NumberField from "./NumberField";
import TextAreaField from "./TextAreaField";
import { AddressSchema } from "./schemas/addressSchema";

// create the mapping
const mapping = [
  [AddressSchema, AddressField],
  [z.number(), NumberField],
  [z.string(), TextAreaField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const VerifierForm = createTsForm(mapping);
