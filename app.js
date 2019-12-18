//jshint esversion:6
const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;

  var data = {
    members:[
    {
    email_address: email,
    status: "subscribed"
  }
]
};
var jsondata=JSON.stringify(data);

var options = {
  url: 'https://us18.api.mailchimp.com/3.0/lists/3e07a3ce1b' ,
  method:"POST",
  headers:{
    "Authorization": "sam007k 4fbc9ac7e2d05f69841671439dc9d107-us18"
  },

  //body: jsondata
};

request(options, function(error, response, body){
if (error){
      res.sendFile(__dirname + "/failure.html");
  }
 else {
  if (response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
  }
  else{

      res.sendFile(__dirname + "/failure.html");
  }

}

});

});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
}
);


//4fbc9ac7e2d05f69841671439dc9d107-us18

//3e07a3ce1b
