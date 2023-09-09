const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', require('./src/routes/productRoutes'));

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/admin.html'));
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(config.app.port, () => {
    console.log(`Server listening on port ${config.app.port}`);
});