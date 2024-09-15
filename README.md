# FriendLink

FriendLink is a social media web application that allows users to connect with friends, send friend requests, accept/reject requests, and view friend recommendations based on mutual connections.

## Features

- User authentication (Sign up & Log in)
- Send and receive friend requests
- Accept or reject friend requests
- View a list of friends
- See friend recommendations based on mutual friends
- Search users by username
- Responsive design, styled to look like Instagram

## Tech Stack

- **Frontend**: React.js, Axios, React Router, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Version Control**: Git, GitHub

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aastha-chandel12/FriendLink.git
Navigate to the project directory:

bash
Copy code
cd FriendLink
Install the dependencies for both frontend and backend:

For frontend:

bash
Copy code
cd frontend
npm install
For backend:

bash
Copy code
cd backend
npm install
Usage
Run the backend server:

bash
Copy code
cd backend
npm start
The backend will run on http://localhost:3000.

Run the frontend development server:

bash
Copy code
cd frontend
npm start


API Endpoints
POST /api/signup: Create a new user account.
POST /api/login: Authenticate and log in a user.
GET /api/users: Fetch all users.
POST /api/friend-request: Send a friend request.
POST /api/friend-request/accept: Accept a friend request.
POST /api/friend-request/reject: Reject a friend request.
GET /api/friends: Fetch a list of friends.
GET /api/recommendations: Get friend recommendations.
<img width="1222" alt="Screenshot 2024-09-15 at 10 24 34 PM" src="https://github.com/user-attachments/assets/60d84c26-3456-4d77-93b4-35760f38cbae">
<img width="1080" alt="Screenshot 2024-09-15 at 10 30 53 PM" src="https://github.com/user-attachments/assets/cb7549d2-f739-49a1-b4f2-867056cf27dc">
<img width="1080" alt="Screenshot 2024-09-15 at 10 32 05 PM" src="https://github.com/user-attachments/assets/175cc5f4-3081-48ca-9d49-d71b4a66c792">
