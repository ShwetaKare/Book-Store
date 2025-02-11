const jwt = require("jsonwebtoken")

const authenticateToken =(req,res,next) =>{
    const authheader = req.headers["authorization"]
    const token = authheader && authheader.split(" ")[1]

    if(token == null){
        return res.status(401).json({message:"Authentication token required"})
    }

    jwt.verify(token,"bookstore123",(err,user)=>{
        if(err){
            return res.status(403).json(err);
        }
        req.user=user;
        next();
    })
}
module.exports={authenticateToken}
