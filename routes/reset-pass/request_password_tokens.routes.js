// routes/reset_password_tokens.routes.js

const express = require('express');
const router = express.Router();
const requestPasswordResetController  = require('../../controllers/reset-pass/request_password_tokens.controller');

router.post('/data', requestPasswordResetController .requestPasswordReset);

module.exports = router;
