const jwt = require('jsonwebtoken');
function verify(req,res,next){
    const token = req.cookies.token
    if(!token) return res.status(401).redirect('/login');
    try{
        const verified = jwt.verify(token, process.env.jwtSecret);
        req.user = verified;
    }catch(err){
        res.status(400).redirect('/login');

    }
    next()
}

module.exports = verify;