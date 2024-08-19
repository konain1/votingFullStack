
const User = require('../models/user')
const express = require('express')
const bcrypt = require('bcrypt')
const {generateToken,verifyTokenMiddleware }= require('../jwt')
const route  = express.Router();



route.get('/api/v1/users',async function(req,res){

    let users = await User.find();

    res.json({users})
})

route.post('/create',async(req,res)=>{

    let data = req.body;

   
   let person = await User.findOne({phone:data.phone});

   if(!person){
    if(data.role == 'admin'){
        let adminExists = await User.findOne({role:"admin"})
        if(adminExists){

            return res.json({msg:'admin already exists'})
        }
    }



    const newUser =  new User(data)
    await newUser.save();

    res.json({msg:'singup'})
   }
   

   
})
route.put('/password',verifyTokenMiddleware, async(req,res)=>{
    
    let userid = req.user.userId;
    let password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    await User.findByIdAndUpdate(userid,{password:hashedPassword})
    res.status(200).json({ message: "Password updated successfully." });
    
})


route.post('/login', async (req, res) => {
    let data = req.body;
    let userInfo = await User.findOne({ phone: data.phone });
  
    if (!userInfo || !(await userInfo.comparePassword(data.password))) {
      return res.status(400).json({ msg: "Invalid phone or password" });
    }
  
    const token = generateToken(userInfo._id);
    res.json({ userInfo, token }); // Include the token in the response
  });
  


route.get('/api/v1/currentUser',verifyTokenMiddleware,async (req,res)=>{

    let userid = req.user.userId;
    
    let CurrentUser = await User.findById(userid);

    res.json({CurrentUser})
})

route.put('/api/v1/userUpdate',verifyTokenMiddleware,async(req,res)=>{
    let data = req.body;
    let userId = req.user.userId;
    let updateUserData = await User.findByIdAndUpdate(userId,data)
    res.json({updateUserData})
})

module.exports = route