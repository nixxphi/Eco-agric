import Vendor from './vendor.model.js';
import MarketItem from './marketItem.model.js';
import bcrypt from 'bcrypt';

// To hash the password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// To create a new vendor
export const createVendor = async (req, res) => {
    try {
        const { username, password, vendorType } = req.body;

        // Check if username already exists
        const existingVendor = await Vendor.findOne({ username });
        if (existingVendor) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new vendor instance
        const newVendor = new Vendor({
            username,
            password: hashedPassword,
            vendorType
        });

        // ... and to save the vendor to the database
        await newVendor.save();

        res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to authenticate a vendor
export const authenticateVendor = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the vendor by username
        const vendor = await Vendor.findOne({ username });

        // If vendor not found
        if (!vendor) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, vendor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If authentication successful, return vendor data
        res.json({ message: 'Authentication successful', vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// To add items to the vendors catalogue
export const addItemToVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const { itemId } = req.body;

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Find the market item by ID
        const item = await MarketItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Market item not found' });
        }

        // Add item to vendor's items
        vendor.items.push(itemId);
        await vendor.save();

        res.status(200).json({ message: 'Item added to vendor successfully', vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// I added a function to raise vendor's rank by one so we dont have to wait for sales to test it out 
export const forceRaiseRank = async (req, res) => {
    try {
        const { vendorId } = req.params;

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Boosting vendor's ranks by one
        vendor.generalRank = Math.min(vendor.generalRank + 1, 10); // Cap at 10
        vendor.productRank = Math.min(vendor.productRank + 1, 10); // Cap at 10
        await vendor.save();

        res.status(200).json({ message: 'Vendor rank raised successfully', vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
