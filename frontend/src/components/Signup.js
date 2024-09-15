// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
// import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Initialize navigate

//     const handleSignup = async () => {
//         try {
//             const response = await axios.post('http://localhost:3000/api/signup', {
//                 username,
//                 password,
//             });
//             toast.success('Signup successful!'); // Display success toast
//             console.log(response.data); // Handle success
//             setTimeout(() => {
//                 navigate('/login'); // Redirect to login page after 1 second
//             }, 1000);
//         } catch (error) {
//             toast.error('Signup failed: ' + (error.response ? error.response.data.message : error.message)); // Display error toast
//             console.error('Signup failed:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Sign Up</h2>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />
//             <button onClick={handleSignup}>Sign Up</button>
//             <a href='/login'>Login</a>
//             <ToastContainer /> {/* Add this to show toast notifications */}
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import './Signup.css'; // Import external CSS for styling

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/signup', {
                username,
                password,
            });
            toast.success('Signup successful!'); // Display success toast
            console.log(response.data); // Handle success
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after 1 second
            }, 1000);
        } catch (error) {
            toast.error('Signup failed: ' + (error.response ? error.response.data.message : error.message)); // Display error toast
            console.error('Signup failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Join Us</h2>
                <p className="signup-subtitle">Create a new account</p>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="signup-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="signup-input"
                />
                <button onClick={handleSignup} className="signup-button">Sign Up</button>
                <a href="/login" className="login-link">Already have an account? Log In</a>
                <ToastContainer /> {/* Add this to show toast notifications */}
            </div>
        </div>
    );
};

export default Signup;
