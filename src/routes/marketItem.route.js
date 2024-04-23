import express from 'express';
import { createMarketItem, getMarketItems, getMarketItemById, updateMarketItem, deleteMarketItem } from './marketItem.controller.js';

const router = express.Router();

// POST route to create a new market item
router.post('/', createMarketItem);

// GET route to retrieve all market items
router.get('/', getMarketItems);

// GET route to retrieve a specific market item by ID
router.get('/:id', getMarketItemById);

// PATCH route to update a specific market item by ID
router.patch('/:id', updateMarketItem);

// DELETE route to delete a specific market item by ID
router.delete('/:id', deleteMarketItem);

export default router;
