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
        let result;
        let val = Number(req.body.amount);
        if(currency === 'EUR'){
            rate = response.data.bpi.EUR.rate;
            code = response.data.bpi.EUR.code;
            bitcoin = response.data.bpi.EUR.rate_float;
            result = val * bitcoin;
        } else {
            rate = response.data.bpi.USD.rate;
            code = response.data.bpi.USD.code;
            bitcoin = response.data.bpi.USD.rate_float;
            result = val * bitcoin;
        }
        let disclaimer = response.data.disclaimer;
        console.log(`${val} * ${bitcoin} = ${result.toFixed(2)} ${code}`);
        res.write(`<p>${val} Bitcoin * ${bitcoin} ${code} = ${result.toFixed(2)} ${code}</p>`);
        res.write(`<p> 1 Bitcoin = ${rate} ${code}</p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server has started.');
});