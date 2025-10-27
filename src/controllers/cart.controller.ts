import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { flattenError, ZodError } from "zod";

// PRO: Clean controller to handle the request and response.
export async function calculateCartPriceController(req: Request, res: Response) {
	const cartService = new CartService();

	try {
		const data = req.body;

		// CON: Using await here is not necessary since the function is not actually async.
		const cart = cartService.calculatePrice(data);

		return res.status(201).json(cart);
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(flattenError(error).fieldErrors);
		}

		return res.status(400).json(error);
	}
} 