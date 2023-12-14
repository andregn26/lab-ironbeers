const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(data => {
      // console.log(data);
      res.render('beers', { beers: data });
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(data => {
      console.log('random beer -->', data);
      res.render('random-beer', data[0]);
    })
    .catch(err => console.log(err));
});

app.get('/beer/:id', (req, res) => {
  const id = req.params.id;
  punkAPI.getBeer(Number(id)).then(data => {
    console.log('beer by id -->', data);
    res.render('beer', data[0]);
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
