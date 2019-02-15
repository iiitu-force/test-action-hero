// const mongoose = require('mongoose');
const {Initializer, api } = require('actionhero');
const mongoose = require('mongoose'),
passport = require('passport'),
localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
    // const User = require('/home/ayush/IIITU/alumni-website/models/user.js');

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




module.exports = class Users extends Initializer {
  constructor() {
    super();
    this.name = "users";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.users = {
      signup: async (firstName, lastName, password, branch, email, rollNo) => {
          console.log("in signup");
          User.create({
            firstName : firstName,
            lastName : lastName,
            password : password,
            branch : branch,
            rollNo : rollNo,
            email : email
          }, function(err, newUser){
            if(err)  {
              console.log(err);
              return {error:err , token:null};
            }
            else{
              console.log("save");
              console.log(newUser);

              newUser.save();
              // return {error:null, token:"success"};

            }
          });
      }
    };
  }
}