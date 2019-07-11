const express = require('express');
const router = express.Router();
const { setBarbearia, getBarbearia, generateExcel } = require('../controller/barbearia')
const cors = require('cors')

router.post('/cadastrar', cors(), setBarbearia);

router.get('/', getBarbearia);

router.get('/excel', generateExcel);

module.exports = router;