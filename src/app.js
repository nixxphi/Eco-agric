import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './main.routes.js';

const app = express();

// MongoDB connection setup
mongoose.connect('mongodb://.....', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware for parsing JSON bodies
app.use(express.json());

//include controller, authentication and validation middleware

// Use main routes
app.use(mainRoutes);

// Start the server
const PORT = 6900;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
￼Enter
