import { Router } from "express";

import { cartRouter } from "./cart.routes";

export const router = Router();

router.use("/cart", cartRouter);