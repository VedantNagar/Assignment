//Express App
const express = require('express');
const app = express();

//Imports
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');

//Routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

//Configurations
dotenv.config();

//Settings
/* app.set('trust proxy', 1); */

//Middleware
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  })
);
app.use(express.json({ limit: '30mb' })); //body-parser

app.use(cors());

app.use(morgan('common')); //logger
const verifyToken = require('./middleware/auth'); //auth middleware

//Routes

app.use('/auth', authRoutes); //auth routes
app.use('/users', verifyToken, userRoutes); //user routes
app.use('/posts', verifyToken, postRoutes); //post routes

//Starting Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the DB...');
    app.listen(
      PORT,
      console.log(`Server is listening on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
