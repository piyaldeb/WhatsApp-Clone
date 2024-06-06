// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const individualMessageRoutes = require('./routes/individualMessageRoutes');
const Message = require('./models/Message');
const IndividualMessage = require('./models/IndividualMessage'); // Add this line

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/individual-messages', individualMessageRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinGroup', ({ groupId }) => {
    socket.join(groupId);
  });

  socket.on('sendMessage', async ({ groupId, message }) => {
    try {
      const newMessage = new Message({
        sender: socket.user.id,
        content: message,
        group: groupId,
      });
      await newMessage.save();
      io.to(groupId).emit('message', newMessage);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on('sendIndividualMessage', async ({ receiverId, message }) => {
    try {
      const newIndividualMessage = new IndividualMessage({
        sender: socket.user.id,
        receiver: receiverId,
        content: message,
      });
      await newIndividualMessage.save();
      io.emit(`individualMessage-${receiverId}`, newIndividualMessage);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
