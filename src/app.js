// app.js

const express = require('express');
const app = express();
const db = require('./db.js');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const path = require('path');

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    const reviews = Review.find({}, (err, reviews, count) => {
        res.render('index', {reviews: reviews});
    });
});





app.listen(3000);

console.log('Server started; type CTRL+C to shut down');