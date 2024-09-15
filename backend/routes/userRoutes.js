const express = require('express');
const { getUsers, sendFriendRequest, acceptFriendRequest, getRecommendations, getFriends, getFriendRequests, rejectFriendRequest, unfriend } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, getUsers);
router.post('/friend-request', authMiddleware, sendFriendRequest);
router.put('/friend-request', authMiddleware, acceptFriendRequest);
router.get('/recommendations', authMiddleware, getRecommendations);
router.get('/friends', authMiddleware, getFriends);
router.get('/friend-requests', authMiddleware, getFriendRequests); // This line should be here
router.post('/friend-request/accept', authMiddleware, acceptFriendRequest);
router.post('/friend-request/reject', authMiddleware, rejectFriendRequest);
router.delete('/friend/:friendId', authMiddleware, unfriend);
module.exports = router;
