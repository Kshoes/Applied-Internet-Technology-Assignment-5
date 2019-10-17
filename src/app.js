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

    const queryObj = {};
    if(semesterQ) {
        queryObj.semester = semesterQ;
        console.log(queryObj);
    }
    if(yearQ) {
        queryObj.year = yearQ;
        console.log(queryObj);
    }
    if(professorQ) {
        queryObj.professor = professorQ;
        console.log(queryObj);
    }

    const reviews = Review.find(queryObj, (err, reviews, count) => {
        res.render('index', {reviews: reviews});
    });
});

app.get('/reviews/add', (req, res) => {
    res.render('add');
});

app.post('/reviews/add', (req, res) => {
    new Review({
        courseNumber: req.body.courseNumber,
        courseName: req.body.courseName,
        semester: req.body.semester,
        year: req.body.year,
        professor: req.body.professor,
        review: req.body.review
    }).save((err, reviews, count) =>{
        res.redirect('/');
    });
});



app.listen(3000);

console.log('Server started; type CTRL+C to shut down');