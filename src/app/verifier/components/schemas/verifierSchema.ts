import { z } from "zod";
import { AddressSchema } from "../schemas/addressSchema";

export const VerifierSchema = z.object({
    contractAddress: AddressSchema, // renders TextField
    blockNumber: z.number(),
    contractCode: z.string(), // renders TextField
});