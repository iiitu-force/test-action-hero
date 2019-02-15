// const mongoose = require('mongoose');
const {Initializer, api } = require('actionhero');
const mongoose = require('mongoose'),
passport = require('passport'),
localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
    // const User = require('/home/ayush/IIITU/alumni-website/models/user.js');

mongoose.connect("mongodb://localhost/alumni_db");


// const userSchema = new mongoose.Schema({
//   rollNo : String ,
//   firstName : String ,
//   lastName : String ,
//   branch :String ,
//   password :String ,
//   email : String 
// });

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User", userSchema);


var users=mongoose.model('users', {
  rollNo : String ,
  firstName : String ,
  lastName : String ,
  branch :String ,
  password :String ,
  email : String 
  // hostel:{
  //   type:String
  // },
  // lib:{
  //   type:Number
  // },
  // acad:{
  //   type:String
  // },
  // acadv:{
  //   type:Boolean
  // },
  // hostelv:{
  //   type:Boolean
  // }
});





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
          try{
            console.log("In try");
            var regn = new users({
              _id : new ObjectID(),
              firstName : firstName,
            lastName : lastName,
            password : password,
            branch : branch,
            rollNo : rollNo,
            email : email
              // acad:req.body.Acadmic,acadv:false,hostelv:false
            });
            regn.save().then((doc) => {
              console.log("success");
              // res.send(doc);
            }, (err) => {
               throw err;
            });
          //   const newUser = User.create({
          //     _id:new ObjectID(),
          //   firstName : firstName,
          //   lastName : lastName,
          //   password : password,
          //   branch : branch,
          //   rollNo : rollNo,
          //   email : email
          // });

          // newUser.save();


          //  async function(err, newUser){
          //   console.log("in function");
          //   if(err)  {
          //     console.log("in error");
          //     console.log(err);
          //     throw new Error(err);
          //   }
          //   else{
          //     console.log("save");
          //     console.log(newUser);

              // try{
              // await newUser.save();
              // // }
              // catch(err)
              // {
              //   throw new Error(err);
              // }
              // console.log("saved user");


            }
          // })
        catch(err)
        {
            return {error: err, token: null};
        }
        finally
        {
          return {error: null, token: "success"};

        }
      }
    }
  }
}