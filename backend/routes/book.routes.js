const express = require('express');
const { 
    getAllBooks, 
    getBookById, 
    createBook, 
    getMyBooks, 
    updateBook, 
    deleteBook 
} = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes
router.post('/', protect, createBook);
router.get('/user/my-books', protect, getMyBooks);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;