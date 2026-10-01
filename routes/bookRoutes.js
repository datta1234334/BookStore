// server/routes/bookRoutes.js
// Express routes for book endpoints

import express from 'express';
import { getBooks, getBookById } from '../controllers/bookController.js';

const router = express.Router();

// GET /api/books - Get all books
router.get('/', getBooks);

// GET /api/books/:id - Get single book by ID
router.get('/:id', getBookById);

export default router;