import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { flattenError, ZodError } from "zod";

export async function calculateCartPriceController(req: Request, res: Response) {
	const cartService = new CartService();

	try {
		const data = req.body;

		const cart = await cartService.calculatePrice(data);

		return res.status(201).json(cart);
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(flattenError(error).fieldErrors);
		}

		return res.status(400).json(error);
	}
} 