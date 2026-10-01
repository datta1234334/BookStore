import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '/models/Book.js';

dotenv.config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    description: "A classic American novel set in the Jazz Age.",
    stock: 15,
    cover: "https://example.com/gatsby.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    description: "A powerful story about racial injustice and childhood.",
    stock: 20,
    cover: "https://example.com/mockingbird.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 13.50,
    description: "A dystopian novel about totalitarianism.",
    stock: 10,
    cover: "https://example.com/1984.jpg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    description: "A romantic novel about manners and marriage.",
    stock: 25,
    cover: "https://example.com/pride.jpg"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 10.99,
    description: "A coming-of-age story about teenage angst.",
    stock: 18,
    cover: "https://example.com/catcher.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');


    await Book.deleteMany({});
    console.log('Cleared existing books');

    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();