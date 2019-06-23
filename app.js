const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { db, Product, syncAndSeed } = require('./server');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('index.html'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Magic happening on port: ${port}`));
