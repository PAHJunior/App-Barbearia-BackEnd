const express = require('express');
const router = express.Router();
const { setBarbearia, getBarbearia, generateExcel, apagarDados } = require('../controller/barbearia')

router.post('/barbearia', setBarbearia);

router.get('/barbearia', getBarbearia);

router.get('/barbearia/excel', generateExcel);

router.delete('/barbearia', apagarDados);

module.exports = router;