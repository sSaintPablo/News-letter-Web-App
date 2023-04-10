require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const port = process.env.PORT || 3000

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));






app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.eMail

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url =  "https://us11.api.mailchimp.com/3.0/lists/10f6252327"

const key = process.env.APIKEY

const options = {
  method: "POST",
  auth: "gresky:" + key
}

const request = https.request(url, options, function(response) {

if (response.statusCode === 200) {
res.sendFile(__dirname + "/success.html");

} else {
res.sendFile(__dirname + "/failure.html");

}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});





app.listen(port, function() {
  console.log("Server is running on port 3000!.")
})


// APIkey
// 571bcd32799fdc68b57ff52c3dc63c24-us11

// LIST id
//  10f6252327
