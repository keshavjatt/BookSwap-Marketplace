const Book = require('../models/Book.model');
const Request = require('../models/Request.model');

// All books get karne wala controller
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ available: true })
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: books,
            count: books.length
        });
    } catch (error) {
        console.error('Get all books error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching books'
        });
    }
};

// Single book get karne wala controller
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('owner', 'name email');
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.json({
            success: true,
            data: book
        });
    } catch (error) {
        console.error('Get book by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching book'
        });
    }
};

// New book create karne wala controller
const createBook = async (req, res) => {
    try {
        const { title, author, condition, description, image } = req.body;

        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const book = await Book.create({
            title,
            author,
            condition,
            description,
            image,
            owner: req.user._id
        });

        const populatedBook = await Book.findById(book._id).populate('owner', 'name email');

        res.status(201).json({
            success: true,
            data: populatedBook,
            message: 'Book added successfully'
        });
    } catch (error) {
        console.error('Create book error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating book'
        });
    }
};

// User ke own books get karne wala controller
const getMyBooks = async (req, res) => {
    try {
        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const books = await Book.find({ owner: req.user._id })
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: books,
            count: books.length
        });
    } catch (error) {
        console.error('Get my books error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching your books'
        });
    }
};

// Book update karne wala controller
const updateBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Check karo ki user book ka owner hai ya nahi
        if (book.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this book'
            });
        }

        book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('owner', 'name email');

        res.json({
            success: true,
            data: book,
            message: 'Book updated successfully'
        });
    } catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating book'
        });
    }
};

// Book delete karne wala controller
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Check karo ki user book ka owner hai ya nahi
        if (book.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this book'
            });
        }

        // Book se related requests bhi delete karo
        await Request.deleteMany({ book: req.params.id });

        await Book.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting book'
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    getMyBooks,
    updateBook,
    deleteBook
};