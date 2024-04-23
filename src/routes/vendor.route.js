import express from 'express';
import { createVendor, getVendors, getVendorById, updateVendor, deleteVendor, rankUp } from './vendor.controller.js';

const router = express.Router();

// POST route to create a new vendor
router.post('/', createVendor);

// GET route to retrieve all vendors
router.get('/', getVendors);

// GET route to retrieve a specific vendor by ID
router.get('/:id', getVendorById);

// PATCH route to update a specific vendor by ID
router.patch('/:id', updateVendor);

// DELETE route to delete a specific vendor by ID
router.delete('/:id', deleteVendor);

// POST route to increase vendor ranks by one
router.post('/rank-up', rankUp);

export default router;
