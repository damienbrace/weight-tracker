const express = require('express');
const mongoose = require('mongoose');
const Weight = require('./models/weights');

// express app
const app = express();

// register view engine
const ejs = require('ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    Weight.find()
        .then((result) => {
            res.render('index', {weights: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/', (req, res) => {
    const weight = new Weight(req.body);

    weight.save()
        .then((result) => {
           res.redirect('/') 
        })
        .catch((err) => {
            console.log(err);
        })
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    Weight.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/'});
        })
        .catch(err => {
            console.log(err);
        })
})

// connect to db
const dbURI = 'mongodb+srv://damo989:damo989@cluster0.5cuys.mongodb.net/track-my-weight?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port, () => console.log(`Listening on port: ${port}`)))
    .catch((err) => console.log(err));

// declare port number
const port = 3002;

// Set up views
app.set('views', './views');

// configure view engine
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index');
// })

