const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    headers: {
      'x-ba-key': 'ZGFmNWJkNGU3MDAzNDMwZDg0NzU4ZjU5ODU0MTA5M2I'
    },
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var currentDate = data.time;
    var price = data.price;

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + fiat + "</h1>");

    res.send();
  });

});

// curl -H 'x-ba-key: OTZhMjAxNT0NGFkNDU0N2IyMTdjNjdkYzMxMWZkNzI'
