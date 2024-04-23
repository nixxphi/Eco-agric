import express from 'express';
import MarketItem from './marketItem.model.js';

const router = express.Router();

// POST route to create a new market item
router.post('/market', async (req, res) => {
    try {
        const newItem = new MarketItem(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to retrieve all market items
router.get('/market', async (req, res) => {
    try {
        const items = await MarketItem.find();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to retrieve a specific market item by ID
router.get('/market/:id', async (req, res) => {
    try {
        const item = await MarketItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PATCH route to update a specific market item by ID
router.patch('/market/:id', async (req, res) => {
    try {
        const updatedItem = await MarketItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE route to delete a specific market item by ID
router.delete('/market/:id', async (req, res) => {
    try {
        const deletedItem = await MarketItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
