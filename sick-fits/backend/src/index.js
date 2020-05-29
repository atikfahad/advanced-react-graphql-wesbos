const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// decode JWT so we can decode user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the user id on to the request for further request
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populate on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{id, permissions, email, name}'
  );
  console.log(user);
  req.user = user;
  next();
});

// TODO Use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server is now running on port ${deets.port}`);
  }
);
