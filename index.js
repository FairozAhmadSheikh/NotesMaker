const express = require('express');
const app= express();
const path=require('path');
const fs= require('fs')

//Form Handling 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Seting public static files
app.use(express.static(path.join(__dirname,'public')));
// Settting up view engine
app.set('view engine','ejs')

// routes creation
app.get("/",function(req,res,next){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files})
    }) 
})

app.post("/create",function(req,res,next){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,function(err){
    res.redirect("/")
    })
    
})

app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("showfile",{filename:req.params.filename,filedata:filedata})
    })
})

// Listen on some port
app.listen(3000, function(){
    console.log("Server running on port" +`${3000}`)
})
