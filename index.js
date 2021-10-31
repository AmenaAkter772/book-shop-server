const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 5000
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e2egq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const url = `mongodb+srv://learning-database:learning-database@cluster0.bvdle.mongodb.net/learning-database?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello my dear jan')
})


const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("learning-database").collection("books");
  const OrderCollection = client.db("learning-database").collection("orderBooks");

  app.get('/getBook', (req, res) => {
      //const searchItem = req.query.search
      // find ar vitore bosao =  name: {$regex : searchItem}  
      collection.find({})
      .toArray((err, items) => {
          res.send(items)
      })
  })

  app.get('/getOrderBook', (req, res) => { 
    OrderCollection.find({})
    .toArray((err, items) => {
        res.send(items)
    })
})

  app.post('/addBook', (req, res) => {
      collection.insertOne(req.body)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })

  app.post('/orderBook', (req, res) => {
    OrderCollection.insertOne(req.body)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
  })
  


});


app.listen(port, () => {
    console.log(`my server is running on port ${port}`);
})