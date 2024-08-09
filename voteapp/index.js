

const express = require('express')
const bodyParser =require('body-parser')
const userRoute = require('./route/user.route')
const candidateRouter = require('./route/candidateRoute')
const cors = require('cors')

const app = express()
const db = require('./db')
let port = 4001
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hello voters')
})


app.use('/',userRoute)
app.use('/candidate',candidateRouter)


app.listen(port,()=>{
    console.log(`port on ${port}`)
})