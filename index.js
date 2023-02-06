require("dotenv").config();
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", (req, res) => {
  const headers = req.headers;
  const ipaddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const software = headers["user-agent"];
  const language = headers["accept-language"];

  res.json({
    ipaddress,
    language,
    software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
