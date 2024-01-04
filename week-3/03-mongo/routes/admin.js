const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
let {Admin}=require('../db/index')
let {Course}=require('../db/index')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    try{
        let {username,password}=req.body;

        let admin=await Admin.findOne({
            username:username
        }) 
        if(admin){
            res.status(200).json({
                msg:"admin already exists"
            })
            return;
        }

        let new_admin=await Admin.create({
            username,password
        })
        res.status(201).json({
            msg:"Admin created succesfully "
        })

    }catch(err){
        res.status(500).json({
            err
        })

    }


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    let {username,password}=req.headers;

    let {title,description,price,imageLink}=req.body;

    try{
        let course=await Course.create({
            title,description,price,imageLink
        })

        res.status(201).json({
            message:"Course created Succesfully",
            CourseId:course._id
        })

    }catch(err){
        res.status(411).json(err.message);
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    try{

        let courses=await Course.find({});
        res.json(courses);

    }catch(err){
        res.status(500).json({msg:err.msg})
    }
});

module.exports = router;