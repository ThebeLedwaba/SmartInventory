import mongoose from 'mongoose';
import Item from './models/Item.js';
import 'dotenv/config';

const sampleItems = [
  {
    name: "Power Drill",
    description: "Cordless power drill with lithium battery",
    quantity: 15,
    status: "in-stock",
    lastUpdated: new Date()
  },
  {
    name: "Safety Gloves",
    description: "Industrial safety gloves, size L",
    quantity: 2,
    status: "low-stock",
    lastUpdated: new Date()
  },
  {
    name: "Hammer",
    description: "16oz claw hammer with fiberglass handle",
    quantity: 0,
    status: "out-of-stock",
    lastUpdated: new Date()
  },
  {
    name: "Screwdriver Set",
    description: "12-piece precision screwdriver set",
    quantity: 8,
    status: "in-stock",
    lastUpdated: new Date()
  },
  {
    name: "Measuring Tape",
    description: "25ft retractable measuring tape",
    quantity: 3,
    status: "low-stock",
    lastUpdated: new Date()
  }
];

async function addSampleData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Add sample items
    await Item.insertMany(sampleItems);
    console.log('Added sample data successfully');

    // Display what was added
    const items = await Item.find();
    console.log('\nCurrent inventory:');
    items.forEach(item => {
      console.log(`- ${item.name}: ${item.quantity} (${item.status})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error adding sample data:', error);
    process.exit(1);
  }
}

addSampleData();
