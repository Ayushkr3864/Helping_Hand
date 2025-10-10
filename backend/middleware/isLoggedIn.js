const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
function isLoggedIn(req,res,next) {
    try {
        const token = req.header("Authorization")
    const jwttoken = token.replace("Bearer", "").trim();
    if (!jwttoken) return res.status(401).json({ message: "unauthorised access" });
    else {
        const decoded = jwt.verify(jwttoken, jwtSecret)
        req.user = decoded;
        console.log(decoded);
        
    }
    next();
    } catch (err) {
        res.status(500).json({"error from user":err})
   }
}
module.exports =  {isLoggedIn}