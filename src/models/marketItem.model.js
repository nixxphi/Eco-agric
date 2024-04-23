import mongoose from 'mongoose';

// The Item schema
const marketItemSchema = new mongoose.Schema({
    name: String,
    type: String,
    vendors: [String],
    popularVendors: [String],
    similarProducts: [String],
    complementaryProducts: [String],
    description: String,
    seedsAvailable: Boolean,
    seeds: {
        classification: String,
        viabilityRating: Number,
        soilTypes: [String],
        wateringNeeds: String,
        resistance: {
            pests: Boolean,
            infection: Boolean
        }
    }
});

// the MarketItem model
const MarketItemModel = mongoose.model('MarketItem', marketItemSchema);

// Class for MarketItem
class MarketItem {
    constructor(name, type, vendors, popularVendors, similarProducts, complementaryProducts, description, seedsAvailable, seeds) {
        this.name = name;
        this.type = type;
        this.vendors = vendors;
        this.popularVendors = popularVendors;
        this.similarProducts = similarProducts;
        this.complementaryProducts = complementaryProducts;
        this.description = description;
        this.seedsAvailable = seedsAvailable;
        this.seeds = seeds;
    }

    // Save method to store the market item in MongoDB
    async save() {
        const newItem = new MarketItemModel(this);
        await newItem.save();
    }
}

// Initialize mongoose connection
mongoose.connect('mongodb://.....', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Create a new market item and save it
        const newItem = new MarketItem(/* item data */);
        newItem.save();
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Define the MarketObserver class
class MarketObserver {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(event) {
        this.observers.forEach(observer => observer.notify(event));
    }
}

// Define the MarketItemObserver class
class MarketItemObserver {
    notify(event) {
        console.log(`Event: ${event.type}, Item: ${event.item}`);
    }
}

// Create instances of observer and observerable
const marketObserver = new MarketObserver();
const marketItemObserver = new MarketItemObserver();

// Add the observer to the observerable
marketObserver.addObserver(marketItemObserver);

// Sample usage
const newItemSalesEvent = { type: 'sales', item: newItem };
const newItemAdditionEvent = { type: 'addition', item: newItem };
const newRestockItemEvent = { type: 'update', item: newItem };

// Notify observers of sales
marketObserver.notifyObservers(newItemSalesEvent);

// Notify observers of new item addition
marketObserver.notifyObservers(newItemAdditionEvent);

// Notify observers of new item restocks
marketObserver.notifyObservers(newRestockItemEvent);
