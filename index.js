var express=require('express');
var mongoose=require('mongoose');
var User=require('./Models/User');
var Product=require('./Models/Product');
var bodyparser=require('body-parser');
var db=require('./Mysetup/myurls').myurl;
var app=express();
var urlencodedParser = bodyparser.urlencoded({ extended: false })
var jsonparser=bodyparser.json();

mongoose.connect(db).then(()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log("Error is "+ err.message);
})


app.get('/',function(req,res){
    res.status(200).send("Hi, welcome to the Product crud app");

});

app.post('/signup',jsonparser,function(req,res){

    var newuser= new User(req.body);
    User.findOne({email:newuser.email},function(err,user){
        if(user){
            return res.status(500).json({auth:false,message:"email exist"});
        }
        console.log(newuser);
        newuser.save((err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({error:true,message:"User not created"});
            }
                return res.status(200).json({success:true,message:"User created",user : doc});

        });
    });
});


app.post('/signin',jsonparser,function(req,res){

    var userCred={};

    userCred.email=req.body.email;
    userCred.password=req.body.password;

    User.findOne({email:userCred.email},function(err,profile){

        if(!profile){
            return res.status(500).send("User not exist");
        }
        else{
            console.log(profile);
            console.log(profile.email);
            console.log(profile.password);
            if (userCred.password == profile.password && userCred.email==profile.email){
                return res.status(200).json({success:true,message:"User authenticated"});
            }
            else if(userCred.password != profile.password ){
                return res.status(500).json({error:true,message:"password is incorrect.Please try again"});
            }
            else if(userCred.email != profile.email){
                return res.status(500).json({error:true,message:"Email not exist.Create account"});
            }
            else{
                return res.status(500).json({error:true,message:"Unautherized access"});
            }
        }

    });

});

app.listen(6000, () => {
  console.log(`Server is listening on port 6000`);
});