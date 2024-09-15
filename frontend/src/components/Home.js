import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'; // Import the CSS file

const Home = () => {

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const navigate = useNavigate();  // Initialize useNavigate

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users
                const userResponse = await axios.get('http://localhost:3000/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(userResponse.data);

                // Fetch friends
                const friendResponse = await axios.get('http://localhost:3000/api/friends', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFriends(friendResponse.data);

                // Fetch recommendations
                const recommendationResponse = await axios.get('http://localhost:3000/api/recommendations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecommendations(recommendationResponse.data);
                console.log("recomm", recommendationResponse.data)
                // Fetch friend requests
                const requestResponse = await axios.get('http://localhost:3000/api/friend-requests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFriendRequests(requestResponse.data);

            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [token]);

    const addFriend = async (userId) => {
        try {
            await axios.post(
                'http://localhost:3000/api/friend-request',
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Friend request sent");

            setUsers(users.filter(user => user._id !== userId));
            setRecommendations(recommendations.filter(rec => rec._id !== userId));

            const friendResponse = await axios.get('http://localhost:3000/api/friends', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFriends(friendResponse.data);

        } catch (error) {
            console.error('Error sending friend request', error.response ? error.response.data : error.message);
        }
    };

    const acceptRequest = async (userId) => {
        try {
            await axios.post(
                'http://localhost:3000/api/friend-request/accept',
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Friend request accepted");

            setFriendRequests(friendRequests.filter(request => request._id !== userId));

            const friendResponse = await axios.get('http://localhost:3000/api/friends', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFriends(friendResponse.data);

        } catch (error) {
            console.error('Error accepting friend request', error.response ? error.response.data : error.message);
        }
    };

    const rejectRequest = async (userId) => {
        try {
            await axios.post(
                'http://localhost:3000/api/friend-request/reject',
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Friend request rejected");

            setFriendRequests(friendRequests.filter(request => request._id !== userId));

        } catch (error) {
            console.error('Error rejecting friend request', error.response ? error.response.data : error.message);
        }
    };

    const removeFriend = async (friendId) => {
        try {
            await axios.delete(`http://localhost:3000/api/friend/${friendId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Friend removed");

            setFriends(friends.filter(friend => friend._id !== friendId));

        } catch (error) {
            console.error('Error removing friend', error.response ? error.response.data : error.message);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        toast.success("Logged out successfully");
        navigate('/login');  // Redirect to login page
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="container">

            <h2 className="title">All Users</h2>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
                className="search-input"
            />

            <div className="list">
                {filteredUsers.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    filteredUsers.map(user => (
                        <div className="user-card" key={user._id}>
                            <span className="username">{user.username}</span>
                            <button className="btn btn-add" onClick={() => addFriend(user._id)}>Add Friend</button>
                        </div>
                    ))
                )}
            </div>

            <h2 className="title">Friends List</h2>
            <div className="list">
                {friends.length === 0 ? (
                    <p>You have no friends yet.</p>
                ) : (
                    friends.map(friend => (
                        <div className="user-card" key={friend._id}>
                            <span className="username">{friend.username}</span>
                            <button className="btn btn-remove" onClick={() => removeFriend(friend._id)}>Unfriend</button>
                        </div>
                    ))
                )}
            </div>

            <h2 className="title">Recommendations</h2>
            <div className="list">
                {recommendations.length === 0 ? (
                    <p>No recommendations found</p>
                ) : (
                    recommendations.map(rec => (
                        <div className="user-card" key={rec._id}>
                            <span className="username">{rec.username}</span>
                            <span className="mutual-friends">Mutual Friends: {rec.mutualFriendsCount}</span>
                            <button className="btn btn-add" onClick={() => addFriend(rec._id)}>Add Friend</button>
                        </div>
                    ))
                )}
            </div>

            <h2 className="title">Friend Requests</h2>
            <div className="list">
                {friendRequests.length === 0 ? (
                    <p>No friend requests</p>
                ) : (
                    friendRequests.map(request => (
                        <div className="user-card" key={request._id}>
                            <span className="username">{request.username}</span>
                            <button className="btn btn-accept" onClick={() => acceptRequest(request._id)}>Accept</button>
                            <button className="btn btn-reject" onClick={() => rejectRequest(request._id)}>Reject</button>
                        </div>
                    ))
                )}
            </div>

            <button className="btn btn-logout" onClick={logout}>Logout</button>  {/* Logout button */}

            <ToastContainer />
        </div>
    );
};

export default Home;
