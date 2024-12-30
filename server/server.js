const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes will be added here
app.use('/api/auth', require('./routes/auth'));
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);
app.use('/api/chat', require('./routes/chat'));
app.use('/api/mood', require('./routes/mood'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 