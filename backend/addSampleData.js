import mongoose from 'mongoose';
import Item from './models/Item.js';
import 'dotenv/config';

const sampleItems = [
  {
    name: "Power Drill",
    description: "Cordless power drill with lithium battery",
    quantity: 15,
    status: "in-stock"
  },
  {
    name: "Safety Gloves", 
    description: "Industrial safety gloves, size L",
    quantity: 2,
    status: "in-stock"  // Changed from 'low-stock' to 'in-stock'
  },
  {
    name: "Hammer",
    description: "16oz claw hammer with fiberglass handle",
    quantity: 0, 
    status: "out-of-stock"
  },
  {
    name: "Screwdriver Set",
    description: "12-piece precision screwdriver set",
    quantity: 8,
    status: "in-stock"
  },
  {
    name: "Measuring Tape",
    description: "25ft retractable measuring tape", 
    quantity: 3,
    status: "in-stock"  // Changed from 'low-stock' to 'in-stock'
  }
];

async function addSampleData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('âœ… Connected to MongoDB Atlas');

    // Clear existing items
    await Item.deleteMany({});
    console.log('í·¹ Cleared existing items');

    // Add sample items
    await Item.insertMany(sampleItems);
    console.log('í³¦ Added sample data successfully');

    const items = await Item.find();
    console.log('\ní³‹ Current inventory:');
    items.forEach(item => {
      console.log(`- ${item.name}: ${item.quantity} (${item.status})`);
    });

    console.log('\ní¾‰ Your cloud database is now ready!');
    process.exit(0);
  } catch (error) {
    console.error('âŒ Error adding sample data:', error.message);
    process.exit(1);
  }
}

addSampleData();
