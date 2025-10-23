import { Router } from "express";

import { calculateCartPriceController } from "../controllers/cart.controller";

export const cartRouter = Router();

cartRouter.post("/price", async (req, res) => {
	return calculateCartPriceController(req, res);
})
