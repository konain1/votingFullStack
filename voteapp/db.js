const mongoose = require('mongoose')

const mongoLocalURL = 'mongodb+srv://konain7:Kaunain99@cluster0.rmyvhx6.mongodb.net/'


const mongodbURL = mongoose.connect(mongoLocalURL)

const db = mongoose.connection;
db.on('connected',()=>console.log('mongo is connected'))
db.on('error',(err)=>console.log('mongo has erro = ',err))
db.on('disconnected',()=>console.log('mongo is disconnected'))

module.exports = db