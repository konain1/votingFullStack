
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// import hash from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
   
    password:{
        type:String,
        required:true
    },
    email:{
        
        type:String,
        required:true,
        unique:true

    },
    age:{
        type:Number,
        required:false
    },
    role:{
        type:String,
        enum:["admin","voter"],
        default:"voter"
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

// userSchema.pre('save',async function(next){
//     const hashPassword = await bcrypt.hash(this.password,10)
//     this.password = hashPassword
//     next()

// })

userSchema.pre('save',async function(next){
    const person = this

    if(!person.isModified('password') ) return next();

    try {
        // hashed password generate

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt)
        person.password = hashedPassword
        

    } catch (error) {
        console.log('error from schema',error)
        throw error
    }

})

userSchema.methods.comparePassword = async function(condidataPassword){

    try {
        let isMatched = await bcrypt.compare(condidataPassword,this.password)
        return isMatched
    } catch (error) {
        throw error
    }
}



const User = mongoose.model('User',userSchema)

module.exports = User