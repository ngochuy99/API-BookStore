const jwt = require("../middleware/jwt");

let checkAuth = async function(req,res,next){
    const clientToken = req.body.token;
    if(clientToken){
        try {
            const decoded = jwt.verify(clientToken,process.env.secretKey);
            req.jwtDecoded = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
    }
    else{
        res.status(403).json({
            message:"no token provided"
        });
    }
}
module.exports = checkAuth