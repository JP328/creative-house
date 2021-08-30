//Usei o express para criar e configurar meu servidor
// http://127.0.0.1:3000/
const express = require('express')
const server = express()
const db = require('./db')

/*
const ideas = [
  {
    img: 'https://image.flaticon.com/icons/png/512/2729/2729007.png',
    title: 'Curso de Programação',
    category: 'Estudos',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  },
  {
    img: 'https://image.flaticon.com/icons/png/512/2729/2729009.png',
    title: 'Videos de Culinária',
    category: 'Estudos',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  },
  {
    img: '	https://image.flaticon.com/icons/png/512/2729/2729069.png',
    title: 'Yoga',
    category: 'Saúde',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  },
  {
    img: 'https://image.flaticon.com/icons/png/512/2729/2729032.png',
    title: 'Karaokê',
    category: 'Entretenimento',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  },
  {
    img: 'https://image.flaticon.com/icons/png/512/2729/2729038.png',
    title: 'Pintura',
    category: 'Criatividade',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  },
  {
    img: 'https://image.flaticon.com/icons/png/512/2729/2729064.png',
    title: 'Esconde-Esconde',
    category: 'Entretenimento',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste',
    url: 'http://127.0.0.1:3000/'
  }
]
*/

//configurar arquivos estáticos (css, script, imagens)
server.use(express.static('public'))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  express: server,
  noCache: true
})

//criei uma rota /
//e capturo o pedido do cliente para responder
server.get('/', (req, res) => {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }

    return res.render('index.html', { ideas: lastIdeas })
  })
})

server.get('/ideas', (req, res) => {
  db.all(`SELECT * From ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    const reversedIdeas = [...rows].reverse()

    return res.render('ideias.html', { ideas: reversedIdeas })
  })
})

server.post('/', (req, res) => {
  //  Inserir dado na tabela
  const query = `INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES(?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!')
    }

    return res.redirect('/ideas')
  })
})

//liguer meu servidor na porta 3000
server.listen(3000)
