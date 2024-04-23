import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './main.routes.js';
import { addItemToVendor, forceRaiseRank } from './vendor.controller.js';
import { authenticateVendor } from './authentication.middleware.js';
import { validateAddItemToVendor, validateForceRaiseRank } from './validation.middleware.js';

const app = express();

// MongoDB connection 
mongoose.connect('mongodb://.....', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware for parsing JSON bodies
app.use(express.json());

// Authentication middleware
app.use(authenticateVendor);

// Routes for adding item to vendor and raising rank
app.post('/vendor/:vendorId/add-item', validateAddItemToVendor, addItemToVendor);
app.patch('/vendor/:vendorId/raise-rank', validateForceRaiseRank, forceRaiseRank);

// Use the main route file
app.use(mainRoutes);

// Start the server
const PORT = 6900;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
