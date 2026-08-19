import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/cart:
 *   post:
 *     summary: Add item to user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartItemDTO'
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Validation or stock error
 *       401:
 *         description: Not authorized
 */
router.post("/", protect, cartController.addItemToCart);

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get current user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       401:
 *         description: Not authorized
 */
router.get("/", protect, cartController.getCart);

export default router;
