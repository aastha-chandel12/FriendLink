const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Get friend requests
exports.getFriendRequests = async (req, res) => {
    const currentUserId = req.user.userId;
    try {
        const user = await User.findById(currentUserId).populate('friendRequests');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.friendRequests);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching friend requests' });
    }
};

// Send friend request
exports.sendFriendRequest = async (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.user.userId;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.friendRequests.includes(currentUserId)) {
            user.friendRequests.push(currentUserId);
            await user.save();
        }
        res.json({ message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending friend request' });
    }
};

exports.acceptFriendRequest = async (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.user.userId;

    try {
        // Add userId to currentUser's friends array if not already present
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { friends: userId }
        });

        // Add currentUserId to the other user's friends array if not already present
        await User.findByIdAndUpdate(userId, {
            $addToSet: { friends: currentUserId }
        });

        // Remove userId from currentUser's friendRequests
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { friendRequests: userId }
        });

        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Error accepting friend request' });
    }
};


// Get friends
exports.getFriends = async (req, res) => {
    const currentUserId = req.user.userId;
    try {
        const user = await User.findById(currentUserId).populate('friends');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching friends' });
    }
};

exports.getRecommendations = async (req, res) => {
    const currentUserId = req.user.userId;

    try {
        // Fetch the current user and populate their friends
        const currentUser = await User.findById(currentUserId).populate('friends');
        if (!currentUser) return res.status(404).json({ error: 'User not found' });

        // Get the list of current user's friends' IDs
        const friendIds = currentUser.friends.map(friend => friend._id.toString());

        // Find potential recommendations: users who are friends with current user's friends
        const potentialRecommendations = await User.find({
            _id: { $nin: [...friendIds, currentUserId] },  // Exclude current user and current user's friends
            friends: { $in: friendIds }  // Must be friends with at least one of current user's friends
        }).populate('friends');

        // Calculate mutual friends count for each potential recommendation
        const recommendations = potentialRecommendations.map(user => {
            // Calculate mutual friends by intersecting the friends arrays
            const mutualFriends = user.friends.filter(friend => friendIds.includes(friend._id.toString()));
            return {
                ...user.toObject(),
                mutualFriendsCount: mutualFriends.length
            };
        });

        // Sort recommendations by mutual friends count in descending order
        recommendations.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Error getting recommendations' });
    }
};


// Reject friend request
exports.rejectFriendRequest = async (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.user.userId;

    try {
        await User.findByIdAndUpdate(currentUserId, { $pull: { friendRequests: userId } });

        res.json({ message: 'Friend request rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting friend request' });
    }
};

// Unfriend a user
exports.unfriend = async (req, res) => {
    const { friendId } = req.params;
    const currentUserId = req.user.userId;

    try {
        await User.findByIdAndUpdate(currentUserId, { $pull: { friends: friendId } });
        await User.findByIdAndUpdate(friendId, { $pull: { friends: currentUserId } });

        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing friend' });
    }
};
