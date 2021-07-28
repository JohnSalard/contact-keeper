const express = require('express');
const connectDB = require('./config/database');
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const contactsRoute = require('./routes/contacts');

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome Contact Keeper API' });
});

// Define Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/contacts', contactsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
