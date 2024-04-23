import express from 'express';
import { createVendor } from './vendor.controller.js';

const router = express.Router();

// POST route to create a new vendor
router.post('/vendors', createVendor);

export default router;
