// importing required libraries and setting up express server
const express= require('express');
const expressLayout=require('express-ejs-layouts');
const app=express();

const db=require('./config/mongoose');  // configuring the mongodb server

const port=8000;  // defining port number

app.set("view engine","ejs"); //setting view engine to ejs file extension
app.set('views','./views');  

app.use(expressLayout); 	//using layout for all pages

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.listen(port,err=>{
    if(err){
        console.log('Error in running the server',err)
    }
    console.log(`Server is running on port :${port}`)
});