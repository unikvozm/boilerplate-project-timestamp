// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date?", (req, res) => {
  let { date } = req.params;
  let utc;
  let unix;

  // checking for a unix time format
  if (/\d{5,}/.test(date)) {
    unix = Number(date);
    utc = new Date(unix).toUTCString();
  } else if (date === undefined) {
    utc = new Date().toUTCString();
    unix = new Date().valueOf();
  } else {
    utc = new Date(date).toUTCString();
    unix = new Date(date).valueOf();

    if (utc === "Invalid Date") {
      res.send({ error: "Invalid Date" });
    }
  }

  res.send({ utc, unix });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
