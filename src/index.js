const bodyParser = require('body-parser')
const express= require('express')
const mongoose = require('mongoose')
const route=require('./route/route')

const app=express()
app.use(bodyParser.json())



mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Rameshwar:kkX7KQpRaKAxNuew@programr.r4qditm.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("MongoDB connected! **"))
.catch((error)=> console.log(error))


app.use('/',route)



app.listen(4000,function (){
   console.log("Port connected to ! ",+3000)
})  



