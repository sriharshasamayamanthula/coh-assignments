const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://havairvpm:harsha123@coh-cluster.ktpjmo8.mongodb.net/course-selling');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type:String
    },
    password:{
        type:String
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type:String
    },
    password:{
        type:String
    },
    PurchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:{
        type:String,
    },
    description:{
        type:String,
    },price:{
        type:Number
    },
    imageLink:{
        type:String
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}