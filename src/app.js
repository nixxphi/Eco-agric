import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './main.routes.js';
import vendorRoutes from './vendor.routes.js';
import { authenticateVendor } from './authentication.middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// MongoDB connection 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware for parsing JSON bodies
app.use(express.json());

// Authentication middleware
app.use(authenticateVendor);

// Use vendor routes
app.use('/vendor', vendorRoutes);

// Use the main route file
app.use(mainRoutes);

// Start the server
const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
