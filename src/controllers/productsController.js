const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// toThousand FUE LO UNICO QUE NO TUVE EXITO, probe de todo para que funcione el separador de miles pero no hubo caso
const toThousand = n =>{
n. toString() . replace( /\B(?=(\d{3})+(?!\d))/g,
"." ) ;
}

// let ofertas = products.filter((product) => {
//     return product.category == "in-sale";
// })

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('index', {products, toThousand})
	},
	// All - Show all products
	all: (req, res) => {
		res.render('products', {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idDelProducto= req.params.id;
		let product = products.find(product => product.id == idDelProducto)
		let finalPrice = (product.price) * (1-(product.discount/100))
		res.render('detail', {product, finalPrice, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let nuevoProducto = {
			id: products.length + 1,
			// products[products.lenght - 1] me da el ultimo ID y sumandole +1 hago el nuevo id para dar continuidad
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: 'defaul-image.png' // pongo string porque no viene del formulario
			// ...req.body reemplaza a todo el choclo, pero es menos legible
		}
		// no uso PUSH para poner mi nuevo producto en el array products porque devuelve algo

		// FORMA PRO para agregar nuevo producto ---> Uso SPREAD OPERATOR
		// Spread Operator ... esparci todo el contenido del array producto y al final agregale el otro objeto
		let nuevaBaseDD = [...products, nuevoProducto];
		// Ahora tengo que guardarlo en un JSON
		let nuevaBaseDDJSON = JSON.stringify(nuevaBaseDD);
		fs.writeFileSync(productsFilePath, nuevaBaseDDJSON);
		// res.redirect('products',{products})
		// res.send(setTimeout(function(){ x.value = "4 seconds" }, 4000)); //Esto me muestra el texto cronometrado
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id= req.params.id;
		let product = products.find(product => product.id == req.params.id)
		res.render('product-edit-form', {product})
	},
	// Update - Method to update
	update: (req, res) => {
		let editId = req.params.id
        products.forEach(product => {
        if (product.id == editId) {
            product.name = req.body.name
            product.description = req.body.description
            product.price = req.body.price
            product.discount = req.body.discount
            product.image = "default-image.png"
            product.category = req.body.category           
        }            
        });
        let productsJson = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, productsJson)
        res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		let idDelProductoABorrar = req.params.id;
		let nuevaBaseDeDatos = products.filter((product) => product.id != idDelProductoABorrar  ) 
		// (product) representa a cada una de las posiciones del array, va recorriendo una por una
		let nuevaBaseDeDatosJSON = JSON.stringify(nuevaBaseDeDatos);
		fs.writeFileSync(productsFilePath, nuevaBaseDeDatosJSON)
		// primer parametro el path, segundo que le meto 
			res.redirect('/')
	}
};

module.exports = controller;