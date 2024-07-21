const express = require('express');
const router = express.Router();

const usersRouter = require('./users');

router.use('/users', usersRouter);
// Add more route modules as needed

module.exports = router;
