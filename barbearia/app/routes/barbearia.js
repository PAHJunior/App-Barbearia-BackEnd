const express = require('express');
const router = express.Router();
const { setBarbearia, getBarbearia, generateExcel } = require('../controller/barbearia')
const cors = require('cors')

router.post('/barbearia', cors(), setBarbearia);

router.get('/barbearia', getBarbearia);

router.get('/barbearia/excel', generateExcel);

module.exports = router;