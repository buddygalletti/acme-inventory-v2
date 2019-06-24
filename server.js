const Sequelize = require('sequelize');
const express = require('express');

const db = new Sequelize(`postgres://localhost:5432/acme_inventory`, {
  logging: false
});

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('INSTOCK', 'BACKORDERED', 'DISCONTINUED'),
    defaultValue: 'INSTOCK'
  }
});

// need to write a syncAndSeed()
sampleProducts = [
  {
    name: 'prod1',
    status: 'BACKORDERED'
  },
  {
    name: 'prod2'
  },
  {
    name: 'prod3',
    status: 'DISCONTINUED'
  },
  {
    name: 'prod4',
    status: 'DISCONTINUED'
  }
];

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      sampleProducts.map(product => {
        return Product.create(product);
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

syncAndSeed();

module.exports = {
  db,
  Product,
  syncAndSeed
};
