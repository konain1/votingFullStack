require("dotenv").config(); 
const jwt = require('jsonwebtoken')



function generateToken(userId){


       const token = jwt.sign({userId},process.env.JWT_SECRET_KEY)
   console.log(token)
   return token

}


const verifyTokenMiddleware = (req, res, next) => { 

    const token = req.headers.authorization.split(' ')[1];
    // let token  = req.body.token;

    if (!token) return res.status(403).json({  
        msg: "No token present" 
    }); 

    try { 
        const decoded = jwt.verify(token,  
            process.env.JWT_SECRET_KEY); 

        req.user = decoded; 

    } catch (err) { 
        return res.status(401).json({  
            msg: "Invalid Token" 
        }); 
    } 
    next(); 
}; 

module.exports = {generateToken,verifyTokenMiddleware}