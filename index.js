const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// initialize socket.io
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer);

// DataBase Connection...
connectDB();

const whiteList = ['http://localhost:4200', 'http://localhost:8888', 'https://serene-shore-46996.herokuapp.com/'];
const corsOption = {
  origin: (origin, callback) => {
    console.log('**Origin of request' + origin);
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      console.log('accepted origin');
      callback(null, true);
    }else {
      console.log('Origin error');
      callback(new Error('Not allowed'))
    }
  }
}

// Init Middleware...
app.use(
  express.json({
    extended: false,
  }),
);
app.use(cors(corsOption));

// Defining Routes...
app.use('/api/register', require('./routes/api/users')); // register user route
app.use('/api/auth', require('./routes/api/auth')); // Login user route
app.use('/api/vendor', require('./routes/api/vendor')); // Vendor Routes
app.use('/api/certificate', require('./routes/api/certificate')); // Certificate Routes
app.use('/api/exams', require('./routes/api/exam'));


if(process.env.NODE_ENV == 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});

// io.on('connection', (res) => console.log('hello from socket'));
// // httpServer.listen(PORT);
