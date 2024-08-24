const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    const token = auth && auth.replace('Bearer ', '');
    console.log("auth=====", token);
    
    if(!auth){
        return res.status(403).json({message: 'Unauthorized, JWT token required'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json({message: 'Unauthorized, Invalid/expired JWT token'})  
    }
}

module.exports = isAuthenticated;