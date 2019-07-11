const excel = require('node-excel-export');
const { barbearia } = require('../model/barbearia')

function msg(status, msg) {
  return {
    status: status,
    data: msg
  }
}

const setBarbearia = (req, res, next) => {
  const { cortes, bebidas, produtos } = req.body

  if (!cortes) {
    return res.status(400).send(msg(400, "cortes é um campo obrigatorio"))

  }
  if (!bebidas) {
    return res.status(400).send(msg(400, "bebidas é um campo obrigatorio"))
  }

  if (!produtos) {
    return res.status(400).send(msg(400, "produtos é um campo obrigatorio"))
  }

  barbearia.create(req.body)
    .then(() => {
      res.status(200).send(msg(200, "Cadastro efetuado com sucesso"))
    })
    .catch(() => {
      res.status(200).send(msg(400), "Erro ao efetuar o cadastro")
    })
}

const getBarbearia = (req, res, next) => {
  barbearia.find()
    .then((barbearia) => {
      res.status(200).send(msg(200, barbearia))
    })
    .catch(() => {
      res.status(200).send(msg(400, "Erro ao buscar os dados"))
    })
}


const generateExcel = (req, res, next) => {

  // You can define styles as json object
  const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFF00'
        },
        sz: 24,
        bold: true,
        underline: false
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
      }
    },
    titulo: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFF00'
        },
        sz: 14,
        bold: true
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      }
    },
    cell: {
      alignment: {
        vertical: 'center',
        horizontal: 'center',
      }
    },
    data: {
      numFmt: 'm/dd/yy',
      alignment: {
        vertical: 'center',
        horizontal: 'center',
      }
    },
    number: {
      numFmt: '0',
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      }
    }
  };

  //Array of objects representing heading rows (very top)
  const heading = [
    [{ value: 'BARBEARIA 1 DE OUTUBRO', style: styles.headerDark }],
    [' '] // <-- It can be only values
  ];

  //Here you specify the export structure
  const specification = {
    barbearia_data: { // <- the key should match the actual data key
      displayName: 'Data', // <- Here you specify the column header
      headerStyle: styles.titulo, // <- Header style
      width: 100, // <- width in pixels
      cellStyle: function (value, row) {
        return styles.data
      }
    },
    barbearia_tipo: {
      displayName: 'Tipo',
      headerStyle: styles.titulo,
      width: 100,
      cellStyle: function (value, row) {
        return styles.cell
      }
    },
    barbearia_categoria: {
      displayName: 'Categoria',
      headerStyle: styles.titulo,
      width: 100,
      cellStyle: function (value, row) {
        return styles.cell
      }
    },
    barbearia_cartao: {
      displayName: 'Cartão',
      headerStyle: styles.titulo,
      width: 100,
      cellStyle: function (value, row) {
        return styles.number
      }
    },
    barbearia_dinheiro: {
      displayName: 'Dinheiro',
      headerStyle: styles.titulo,
      width: 100,
      cellStyle: function (value, row) {
        return styles.number
      }
    },
    barbearia_quantidade: {
      displayName: 'Quantidade',
      headerStyle: styles.titulo,
      width: 200,
      cellStyle: function (value, row) {
        return styles.number
      }
    }
  }

  function setRowsExcel(data, tipo, categoria, cartao, dinheiro, quantidade) {
    return {
      barbearia_data: data,
      barbearia_tipo: tipo,
      barbearia_categoria: categoria,
      barbearia_cartao: cartao,
      barbearia_dinheiro: dinheiro,
      barbearia_quantidade: quantidade
    }
  }

  let dataset = []
  barbearia.find()
    .then(function (barbearia) {
      for (let i = 0; i < barbearia.length; i++) {
        let dia = barbearia[i].create
        let cortes = barbearia[i].cortes
        // Linhas dos cortes de cabelo e barbas
        if ((cortes.cabelo.dinheiro > "0") || (cortes.cabelo.cartao > "0")) {
          dataset.push(setRowsExcel(dia, "Cabelo", "Cortes", parseInt(cortes.cabelo.cartao), parseInt(cortes.cabelo.dinheiro), parseInt(cortes.cabelo.dinheiro) + parseInt(cortes.cabelo.cartao)))
        }
        if ((cortes.barba.dinheiro > "0") || (cortes.barba.cartao > "0")) {
          dataset.push(setRowsExcel(dia, "Barba", "Cortes", parseInt(cortes.barba.cartao), parseInt(cortes.barba.dinheiro), parseInt(cortes.barba.dinheiro) + parseInt(cortes.barba.cartao)))
        }

        // Linhas das bebidas no Excel
        let bebidas = barbearia[i].bebidas
        if (bebidas.coca.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Coca-Cola 350ml", "Bebidas", " ", " ", parseInt(bebidas.coca.quantidade)))
        }
        if (bebidas.budweiser.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Budweiser 350ml", "Bebidas", " ", " ", parseInt(bebidas.budweiser.quantidade)))
        }
        if (bebidas.skol.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Skol 290ml", "Bebidas", " ", " ", parseInt(bebidas.skol.quantidade)))
        }
        if (bebidas.stella.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Stella g. 275ml", "Bebidas", " ", " ", parseInt(bebidas.stella.quantidade)))
        }
        if (bebidas.bonafont.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Bonafont 500ml", "Bebidas", " ", " ", parseInt(bebidas.bonafont.quantidade)))
        }

        // Linhas dos produtos no Excel
        let produtos = barbearia[i].produtos
        if (produtos.gel.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Gel Mutation", "Produtos", " ", " ", parseInt(produtos.gel.quantidade)))
        }
        if (produtos.cera.quantidade > "0") {
          dataset.push(setRowsExcel(dia, "Cera Infinty", "Produtos", " ", " ", parseInt(produtos.cera.quantidade)))
        }

      }

      const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 6 } },
        { start: { row: 2, column: 1 }, end: { row: 2, column: 6 } }
      ]

      // Create the excel report.
      // This function will return Buffer
      const report = excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
          {
            name: 'Barbearia 1 de outubro', // <- Specify sheet name (optional)
            heading: heading, // <- Raw heading array (optional)
            merges: merges, // <- Merge cell ranges
            specification: specification, // <- Report specification
            data: dataset // <-- Report data
          }
        ]
      );

      let dia = new Date().getDate()
      res.attachment(`barbearia_1_outubro_${dia}.xlsx`); // This is sails.js specific (in general you need to set headers)
      return res.send(report);
    })
}
module.exports = {
  setBarbearia,
  getBarbearia,
  generateExcel
}