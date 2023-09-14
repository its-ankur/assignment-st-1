const express=require('express');
const fs=require('fs');
const app=express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/login",(req,res)=>{
    let data=fs.readFileSync("public/user.txt","utf8");
    let users=JSON.parse(data);
    let user=users.find(u=>u.username==req.body.username && u.password==req.body.password);
    if(user){
        res.send("Welcome "+user.username);
    }else{
        res.send("Invalid username or password");
    }
    //console.log(req.body);
});

app.post("/signup",(req,res)=>{
    let data=fs.readFileSync("public/user.txt","utf8");
    let users=JSON.parse(data);
    let user=users.find(u=>u.username==req.body.username);
    if(user){
        res.send("Username already exists");
    }else{
        users.push(req.body);
        fs.writeFileSync("public/user.txt",JSON.stringify(users));
        res.send("Signup successful");
    }
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});