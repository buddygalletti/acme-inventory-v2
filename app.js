const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { db, Product, syncAndSeed } = require('./server');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port: ${port}`));
