import { createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";

export const AddressSchema = createUniqueFieldSchema(
    z.string().regex(/^(0x)?[0-9a-fA-F]{40}$/, "Please enter a valid address"),
    "address" // You need to pass a string ID, it can be anything but has to be set explicitly and be unique.
  );