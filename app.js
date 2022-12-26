const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', function(req,res){

    res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req,res){

    var firstName = req.body.firstname;
    var secondName = req.body.lastname;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,

                }

            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/990ade8619'

    const options = {
        method: 'POST',
        auth: "subham1:c84e3bf99207b53b5a043d4c1bb551a4-us21"
    };

    const Request = https.request(url,options, function(response){
        console.log(res.statusCode)
        if (response.statusCode === 200){

            res.sendFile(__dirname+"/success.html");
        }
        else{

            res.sendFile(__dirname+'/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data))
        })

    })
    Request.write(jsonData);
    Request.end();
});

app.post('/failure', function(req,res){

    res.redirect('/');
});
module.exports = app;


//API key
//c84e3bf99207b53b5a043d4c1bb551a4-us21

//list
//990ade8619
