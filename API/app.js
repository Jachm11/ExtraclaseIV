const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/node-api',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});


// ADD a new item
app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});


// UPDATATE an item
app.post('/item/update' , (req, res) => {
 
  const name = req.body.name;

  const newName = req.body.newName;

  Item.update({name : name},{$set : {name : newName}});

  res.redirect('/');

});


// DELETE an item
app.post('/item/delete' , (req, res) => {

  const name = req.body.name;

  Item.remove({name : name});

  res.redirect('/');
      
});
    

app.listen(port, () => console.log('Server running...'));
