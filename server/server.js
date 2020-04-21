const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const axios = require("axios");

require("dotenv").config();


app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.get('/cities', (req, res) => {
    axios({
        "method": "GET",
        "url": "https://indian-cities-api-nocbegfhqg.now.sh/cities",
        "headers": {
            "content-type": "application/json",
        }

    })
        .then((response) =>
            res.json(response.data)
        )
        .catch((error) => {
            console.log(error)
        })
})

app.get('/cityinfo/:name', (req, res) => {
    axios({
        "method": "GET",
        "url": `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.name}&key=${process.env.KEY}`,
        "headers": {
            "content-type": "application/json",
        }

    })
        .then((response) =>
            res.json(response.data)
        )
        .catch((error) => {
            console.log(error)
        })
})

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(`listening at ${port}`));
