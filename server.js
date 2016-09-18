var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// instantiate a twilio
var twilio = require('twilio');
var client = twilio('AC04686989881390300bcaaf11e7317ff5', 'cb8c9e9fad3834588b3245b02b19d8bf');

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.post('/api/sms-promotion', function (request, response) {

    var phone = request.body.phone;
    if (phone == null) {
        response.status(400);
        response.json({ message: "You have not provided a phone number" });
    }
    else {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var message = "";
        if (hours >= 12) {
            var code = "PM" + hours + minutes;
            message = 'Hello! Your promocode is ' + code;
        }
        else {
            var code = "AM" + hours + minutes;
            message = 'Good morning! Your promocode is ' + code;
        }

        // Send the text message with twilio.
        client.sendMessage({
            to: phone,
            from: '+357809196',
            body: message
        });

        response.json({ message: "You will receive the code through sms on number: " + phone });
    }

});

var server = app.listen(80, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);

})