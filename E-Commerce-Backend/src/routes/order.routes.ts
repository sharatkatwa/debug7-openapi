import { Router } from "express";
import orderController from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Place an order from the current cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart empty or insufficient stock
 *       401:
 *         description: Not authorized
 */
router.post("/", protect, orderController.placeOrder);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get order history for current user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *       401:
 *         description: Not authorized
 */
router.get("/", protect, orderController.getOrderHistory);

export default router;
