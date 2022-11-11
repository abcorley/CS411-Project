const express = require('express');
const request = require('request');
const app = express();
const port = 5001;

var ip = require("ip");
console.dir ( ip.address() );

app.get('/', (req, res) => 
    res.status(200).send('<h1>hi<h1>')
);
app.get('/food/:query', (req, res) => {
    queryFood = req.params['query']
    
    const options = {
        method:"GET",
        url:"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        qs: {
            query:queryFood,
            number:5
        },
        headers: {
            'X-RapidAPI-Key': 'cdb6ec9b8cmsh402031dae04fa04p1f7011jsn40359d2736a6',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
	    if (error) throw new Error(error);
        res.status(200).send('<h1>' + body + '<h1>')
    });
});

app.listen(port, () => console.log('Server has started'))

