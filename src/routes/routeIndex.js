const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllerSales');

/* GET programming languages. */
router.get('/index', [controllers.index]);
router.post('/report', [controllers.report]);
router.post('/record', [controllers.record]);


module.exports = router;