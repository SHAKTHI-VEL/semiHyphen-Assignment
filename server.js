const express=require('express')
const userrouter = require('./routes/user.route')
const blogrouter=require('./routes/blog.route')
const { serve, setup } = require('./utils/swagger.utils')
const bodyParser = require('body-parser');
const app=express()
require('dotenv').config()

const PORT=process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api-docs',serve,setup)
app.use('/user',userrouter)
app.use('/blog',blogrouter)

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})