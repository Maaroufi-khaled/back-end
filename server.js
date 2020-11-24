const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import bodyParser from 'body-parser';
// const data = require('./data');

const config = require('./config');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
console.log('mongodb cnx:', mongodbUrl);
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connexion mongodb reussit...'))
  .catch((error) => console.log(error.reason));

const app = express();
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({ msg: "Product Not Found." })

// });
// app.get("/api/products", (req, res) => {
//     console.log('ca marche')
//     res.send(data.products);
// });

app.listen(5000, () => {
  console.log('server started at http://localhost:5000');
});
