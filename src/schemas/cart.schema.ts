import { z } from 'zod';

const itemSchema = z.object({
	name: z.string(),
	// Feature: price range can be between $32 and $39
	price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
	// Should it have a quantity prop?
	collection: z.string(),
})

export const cartSchema = z.object({
	cart: z.object({
		reference: z.string(),
		lineItems: z.array(itemSchema),
	})
});

export type CalculatePriceSchema = z.infer<typeof cartSchema>;
export type ItemPriceSchema = z.infer<typeof itemSchema>;
