import express from 'express';
import marketItemRoutes from './market.route.js';
import vendorRoutes from './vendor.route.js';

const router = express.Router();

// Include market item routes
router.use('/market', marketItemRoutes);

// Include vendor routes
router.use('/vendors', vendorRoutes);

export default router;
