// routes/reset_password.routes.js

const express = require('express');
const router = express.Router();
const resetPasswordController = require('../../controllers/reset-pass/reset_password.controller');

router.post('/data', resetPasswordController.resetPassword);

module.exports = router;
