# Social Media App (MERN Stack)
This is a social media application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create accounts, log in, update their profiles with a bio and profile photo, search for other users, follow/unfollow users, see posts from followed users, create posts (text, image, and video), like/unlike/comment on posts, and chat with other registered users.

## Features
- User Authentication: Create an account, log in, and log out.
- User Profiles: Update profile information including bio and profile photo.
- User Search: Find and follow/unfollow other users.
- Posts: Create, view, and interact with posts (like, unlike, comment). Supports text, images, and videos.
- Feed: View posts from users you follow.
- Real-time Chat: Chat with other registered users.

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB (running locally or accessible remotely)

## Environment Variables
Create a .env file in the root of the project and add the following:
```
PORT=your_port_number
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Steps to Setup
1. Clone the repository:
```
git clone https://github.com/yourusername/your-repo.git
```

2. Install frontend dependencies:
```
cd your-repo/frontend
npm install
```

3. Install backend dependencies:
```
cd ../backend
npm install
```

4. Start the backend server:
```
node server.js
```

5. Start the frontend development server:
```
cd ../frontend/src
npm run dev
```

This will start the project locally. You can access the application in your browser.