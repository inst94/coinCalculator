const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/euro.json';
    let currency = req.body.currency;
    console.log(currency);
    axios.get(url)
    .then(function(response){
        let rate;
        let code;
        if(currency === 'EUR'){
            rate = response.data.bpi.EUR.rate;
            code = response.data.bpi.EUR.code;
        } else {
            rate = response.data.bpi.USD.rate;
            code = response.data.bpi.USD.code;
        }
        let disclaimer = response.data.disclaimer;
        res.write(`<p>${rate} ${code}</p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000.');
});