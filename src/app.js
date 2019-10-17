// app.js

const express = require('express');
const app = express();
const db = require('./db.js');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const path = require('path');

app.set('view engine', 'hbs');

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

const session = require('express-session');
const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
app.use(session(sessionOptions));

app.use((req, res, next) => {
    res.locals.pageCount = req.session.pageCount;
    // console.log(req.session.pageCount);
    // console.log(res.locals.pageCount);
    if(req.session.pageCount === undefined) {
        req.session.pageCount = 0;
    }

    req.session.pageCount++;
    res.locals.pageCount = req.session.pageCount;

    // console.log(req.session.pageCount);
    // console.log(res.locals.pageCount);

    next();
});

app.use((req, res, next) => {
    // console.log(req.session);
    console.log('The Cookie header contains: ' + req.get('Cookie'));
    next();
})




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
    Review.find(queryObj, (err, reviews, count) => {
        if(err) {
            throw err;
        }
        else {
            res.render('index', {reviews: reviews});
        }
    });
});

app.get('/reviews/add', (req, res) => {
    res.render('add');
});

app.post('/reviews/add', (req, res) => {
    const newReview = new Review({
        courseNumber: req.body.courseNumber,
        courseName: req.body.courseName,
        semester: req.body.semester,
        year: req.body.year,
        professor: req.body.professor,
        review: req.body.review
    });
    newReview.save((err, reviews, count) => {
        if(req.session.added) {
            req.session.added.push(newReview);
        }
        else {
            req.session.added = [];
            req.session.added.push(newReview);
        }
        res.redirect('/');
    });
});

app.get('/reviews/mine', (req, res) => {
    res.render('mine', {added: req.session.added});
})



app.listen(3000);

console.log('Server started; type CTRL+C to shut down');