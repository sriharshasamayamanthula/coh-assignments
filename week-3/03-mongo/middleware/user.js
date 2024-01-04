const {User}=require('../db/index')
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    let {username,password}=req.headers;

    if(!username || !password){
        res.status(403).json({msg:"Not authorised"});
    }

    try{
        let user=await User.findOne({
            username:username,
            password:password
        })

        if(!user){
            res.status(411).json({msg:"user does not exist"});
            return;
        }
        next();

    }catch(err){
        res.status(411).json({msg:err.message});
    }
}

module.exports = userMiddleware;