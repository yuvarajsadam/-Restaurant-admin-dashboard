const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getTopSellingItems
} = require('../controllers/orderController');

// GET /api/orders - Get all orders with pagination
router.get('/', getAllOrders);

// GET /api/orders/top-selling - Get top selling items
router.get('/top-selling', getTopSellingItems);

// GET /api/orders/:id - Get single order
router.get('/:id', getOrderById);

// POST /api/orders - Create new order
router.post('/', createOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
