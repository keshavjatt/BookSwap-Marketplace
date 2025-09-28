const Request = require('../models/Request.model');
const Book = require('../models/Book.model');

// New book request create karne wala controller
const createRequest = async (req, res) => {
    try {
        const { bookId, message } = req.body;

        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // User apni hi book ke liye request nahi bana sakta
        if (book.owner.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot request your own book'
            });
        }

        // Check karo ki book available hai ya nahi
        if (!book.available) {
            return res.status(400).json({
                success: false,
                message: 'Book is not available for swapping'
            });
        }

        // Check karo ki pehle se same book ke liye pending request hai ya nahi
        const existingRequest = await Request.findOne({
            book: bookId,
            requester: req.user._id,
            status: { $in: ['pending', 'accepted'] } // Pending ya accepted requests check karo
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'You have already sent a request for this book'
            });
        }

        const request = await Request.create({
            book: bookId,
            requester: req.user._id,
            owner: book.owner,
            message
        });

        const populatedRequest = await Request.findById(request._id)
            .populate('book', 'title author condition image')
            .populate('requester', 'name email')
            .populate('owner', 'name email');

        res.status(201).json({
            success: true,
            data: populatedRequest,
            message: 'Book request sent successfully'
        });
    } catch (error) {
        console.error('Create request error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating request'
        });
    }
};

// Received requests get karne wala controller (book owner ke liye)
const getReceivedRequests = async (req, res) => {
    try {
        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const requests = await Request.find({ owner: req.user._id })
            .populate('book', 'title author condition image')
            .populate('requester', 'name email')
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: requests,
            count: requests.length
        });
    } catch (error) {
        console.error('Get received requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching received requests'
        });
    }
};

// Sent requests get karne wala controller (requester ke liye)
const getSentRequests = async (req, res) => {
    try {
        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const requests = await Request.find({ requester: req.user._id })
            .populate('book', 'title author condition image')
            .populate('requester', 'name email')
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: requests,
            count: requests.length
        });
    } catch (error) {
        console.error('Get sent requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching sent requests'
        });
    }
};

// Request status update karne wala controller (only by book owner)
const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const requestId = req.params.id;

        // Check karo ki user authenticated hai
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const request = await Request.findById(requestId)
            .populate('book', 'title author condition image available owner');
        
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check karo ki current user request ka owner hai ya nahi
        if (request.owner._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this request'
            });
        }

        // Request status update karo
        request.status = status;
        await request.save();

        // Agar request accept ho gayi hai to book ko unavailable mark karo
        if (status === 'accepted') {
            await Book.findByIdAndUpdate(
                request.book._id,
                { available: false },
                { new: true }
            );

            // Same book ke liye baki sabhi pending requests ko declined mark karo
            await Request.updateMany(
                {
                    book: request.book._id,
                    _id: { $ne: requestId },
                    status: 'pending'
                },
                { status: 'declined' }
            );
        }

        // Updated request ko populate karke send karo
        const updatedRequest = await Request.findById(requestId)
            .populate('book', 'title author condition image')
            .populate('requester', 'name email')
            .populate('owner', 'name email');

        res.json({
            success: true,
            data: updatedRequest,
            message: `Request ${status} successfully`
        });
    } catch (error) {
        console.error('Update request status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating request status'
        });
    }
};

module.exports = {
    createRequest,
    getReceivedRequests,
    getSentRequests,
    updateRequestStatus
};