const express = require('express');
const fetch = require('node-fetch');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static('client/build'));

const getMarkets = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
const getCoin = 'https://api.coingecko.com/api/v3/coins/';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.post('/api/coins/markets', async (req, res) => {
    try {
        const page = req.body.page;
        const response = await fetch(getMarkets + '&page=' + page);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

app.get('/api/coins/:id', async (req, res) => {
    try {
        const coinId = req.params.id;
        const response = await fetch(getCoin + coinId + '?market_data=true');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});