const express = require('express');
const router = express.Router();
const { getTransactionData } = require('../controllers/transactionController');
const { verifyIsLoggedIn } = require('../MiddleWare/UserLoggedInVerify');


router.use(verifyIsLoggedIn)
router.post('/', getTransactionData);

module.exports = router;
