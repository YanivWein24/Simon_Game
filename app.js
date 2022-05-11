const express = require('express');
const https = require('https');

var app = express();

app.use(express.static("public"));
// allows to require the internal and external modules (css, bootstrap,images)


app.get("/", function (req, res) {
    console.log("New Entry!");
    res.sendFile(__dirname + "/index.html");
});


const port = process.env.PORT || 3000;

app.listen(port, function () {
    // 'process.env.PORT' allows heroku to choose their own port,
    // instead of forcing them to choose port 3000.
    console.log("Server is running on port 3000\n\n");
});

