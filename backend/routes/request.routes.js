const express = require('express');
const { 
    createRequest, 
    getReceivedRequests, 
    getSentRequests, 
    updateRequestStatus 
} = require('../controllers/request.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.post('/', protect, createRequest);
router.get('/received', protect, getReceivedRequests);
router.get('/sent', protect, getSentRequests);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;