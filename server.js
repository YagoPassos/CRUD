const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Yago:db123456@crud-t4h9y.mongodb.net/Crud?retryWrites=true&amp;w=majority";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Crud')
   
    app.listen(3000)
  })

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view egine', 'ejs');

app.get('/', (req, res) => { res.render('index.ejs') })

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('salvo no banco de dados')
        res.redirect('/show')
    })
})


app.route('/edit/:id').get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var user = req.body.user
  var name = req.body.name
  var surname = req.body.surname
  var email = req.body.email
  var celular = req.body.celular
  var cpf = req.body.cpf
  var rg = req.body.rg
  var endereco = req.body.endereco
  var cidade = req.body.cidade
  var uf = req.body.uf

 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      user:user,
      name: name,
      surname: surname,
      email: email,
      celular: celular,
      cpf: cpf,
      rg: rg,
      endereco: endereco,
      cidade: cidade,
      uf: uf
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
   Alert('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})