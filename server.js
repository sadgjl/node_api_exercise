const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.post("/api/v1/parse", (req, res) => {

    const parsedBodyReq = req.body.data; //receive data from http request using body-parser
    const stringBodyReq = parsedBodyReq.toString();

    const regex = /(0+(?! $))/;
    const m = stringBodyReq.split(regex);

    //generate API respond with data
    res.status(200).send({statusCode: 200, data: {firstName: m[0] + m[1], lastName: m[2] + m[3], clientId: m[4]}})

});

app.post("/api/v2/parse", (req, res) => {

    const parsedBodyReq = req.body.data;
    const stringBodyReq = parsedBodyReq.toString();

    const regex = /(0+(?! $))/;

    const m = stringBodyReq.split(regex);

    res.status(200).send({
        statusCode: 200,
        data: {firstName: m[0], lastName: m[2], clientId: m[4].substring(0, 3) + "-" + m[4].substring(3)}
    })

});


app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
