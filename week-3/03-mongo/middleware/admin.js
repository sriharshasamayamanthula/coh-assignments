
let {Admin}=require('../db/index')
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected


    let {username,password}=req.headers;
    if(!username || !password){
        res.status(411).send("Not authorised");
        return;
    }

    try{
        let admin=await Admin.findOne({
            username:username,
            password:password
        })

        if(!admin){
            res.status(411).json({msg:"user does not exist"});
            return;
        }
        next();

    }catch(err){
        res.status(411).json({msg:err.message});
    }
    

}

module.exports = adminMiddleware;