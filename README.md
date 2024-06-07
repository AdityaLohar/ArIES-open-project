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
PORT=...
MONGO_URL=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Steps to Setup
1. Clone the repository:
```
git clone https://github.com/AdityaLohar/ArIES-open-project
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