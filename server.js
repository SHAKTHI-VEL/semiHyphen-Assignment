const express=require('express')
const userrouter = require('./routes/user.route')
const blogrouter=require('./routes/blog.route')

const app=express()
require('dotenv').config()

const PORT=process.env.PORT

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/user',userrouter)
app.use('/blog',blogrouter)

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})