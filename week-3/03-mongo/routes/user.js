const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User}=require("../db/index")
const {Course}=require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    try{

        let {username,password}=req.body;
        let user=await User.create({username,password});
        res.status(201).json({msg:"User created succesfully"})

    }catch(err){
        res.json({err});
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    try{
    let courses=await Course.find({});
    res.status(200).json({courses})
    }catch(err){
        res.json({msg:err.message});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    try{
        let {courseId}=req.params

        let {username}=req.headers;

        let updated_user=await User.findOneAndUpdate({
            username
        },{
            $push:{
                PurchasedCourses:courseId
            }
        })
        res.status(201).json({msg:"course purchased succesfully"})

    }catch(err){
        res.json({msg:err.message});

    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    try{
        let {username}=req.headers;

        let user=await User.findOne({username});
        let courses=user.PurchasedCourses;

        res.status(200).json({courses})

    }catch(err){
        res.json({msg:err.message});

    }
});

module.exports = router