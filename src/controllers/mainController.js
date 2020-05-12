const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		res.render('index', {products})
	},
	search: (req, res) => {
		let finalPrice = (product.price) * (1-(product.discount/100))
		res.render('results', {products, finalPrice})
	},
};

module.exports = controller;
