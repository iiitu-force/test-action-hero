// function userModel()
{
    const mongoose = require('mongoose'),
        passport = require('passport'),
        localStrategy = require('passport-local'),
            passportLocalMongoose = require('passport-local-mongoose');

    mongoose.connect("mongodb://localhost/alumni_db");

    const userSchema = new mongoose.Schema({
        rollNo : String,
        firstName : String, 
        lastName : String,
        branch : String,
        password : String, 
        email : String
    });

    userSchema.plugin(passportLocalMongoose);

    const User = mongoose.model("User", userSchema);
    
    exports = User;
    // return User;
// }

// exports.userModel = userModel;
