# WhatsApp Clone Backend

This project is a backend implementation for a WhatsApp clone using the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports user authentication, group messaging, individual messaging, group management, and blocking users. The backend uses WebSocket for real-time communication.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Group creation and management
- Sending and receiving messages in groups
- Sending and receiving individual messages
- Blocking users
- Real-time messaging with WebSocket

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT (JSON Web Tokens)
- bcryptjs

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/whatsapp-clone-backend.git
   cd whatsapp-clone-backend
###  Project Structure
```
 whatsapp-clone-backend/
|-- config/
|   `-- db.js                 # Database connection
|-- controllers/
|   |-- authController.js     # Authentication logic
|   |-- messageController.js  # Group messaging logic
|   |-- individualMessageController.js # Individual messaging logic
|   `-- groupController.js    # Group management logic
|-- models/
|   |-- User.js               # User model
|   |-- Message.js            # Group message model
|   `-- IndividualMessage.js  # Individual message model
|   `-- Group.js              # Group model
|-- routes/
|   |-- authRoutes.js         # Authentication routes
|   |-- messageRoutes.js      # Group messaging routes
|   |-- individualMessageRoutes.js # Individual messaging routes
|   `-- groupRoutes.js        # Group management routes
|-- middlewares/
|   `-- authMiddleware.js     # Authentication middleware
|-- server.js                 # Server setup and WebSocket integration
|-- .env                      # Environment variables
|-- .gitignore                # Git ignore file
|-- package.json              # NPM package file
|-- README.md                 # Readme file
```
## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Group Messaging

- `POST /api/messages/send` - Send a message in a group
- `GET /api/messages/:groupId` - Get messages for a group

### Individual Messaging

- `POST /api/individual-messages/send` - Send an individual message
- `GET /api/individual-messages/:receiverId` - Get individual messages between users

### Group Management

- `POST /api/groups/create` - Create a new group
- `PUT /api/groups/rename` - Rename a group
- `PUT /api/groups/block` - Block a user in a group

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

```
## Note:If anyone want postman api test then mail at piyaldeb87@gmail.com with your mail address for approving and sharing the postman collection
