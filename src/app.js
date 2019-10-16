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

    const semesterQ = req.query.semesterQ;
    const yearQ = req.query.yearQ;
    const professorQ = req.query.professorQ;

    const findObj = {};
    if(semesterQ) {
        findObj.semester = semesterQ;
        console.log(findObj);
    }
    if(yearQ) {
        findObj.year = yearQ;
        console.log(findObj);
    }
    if(professorQ) {
        findObj.professor = professorQ;
        console.log(findObj);
    }

    const reviews = Review.find(findObj, (err, reviews, count) => {
        res.render('index', {reviews: reviews});
    });
});





app.listen(3000);

console.log('Server started; type CTRL+C to shut down');