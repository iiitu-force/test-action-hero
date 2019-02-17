// const mongoose = require('mongoose');
const {Initializer, api } = require('actionhero');
const crypto = require('crypto');
const mongoose = require('mongoose'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');
    // const User = require('/home/ayush/IIITU/alumni-website/models/user.js');

mongoose.connect("mongodb://localhost/alumni_db");

function randomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function getPassword(password) {
  const passwordSalt = randomString(64);
  const passwordHash = crypto
    .createHash("sha256")
    .update(passwordSalt + password)
    .digest("hex");
  return [passwordSalt, passwordHash];
}


var userSchema = new mongoose.Schema({
  firstName : String ,
  lastName : String ,
  rollNo : {type:String , unique: true},
  email : {type: String , unique:true},
  branch :String ,
  password_hash :String,
  password_salt: String
});

var User = mongoose.model("User", userSchema);

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
            
        try {
          let newPassword = [null, null];
          if (password) {
            newPassword = getPassword(password);
          }
          var newUser = await User.create({
            firstName : firstName,
            lastName : lastName,
            password_hash : newPassword[1],
            password_salt : newPassword[0],
            branch : branch,
            rollNo : rollNo,
            email : email
          });
          await newUser.save();
        } catch(err) {
          console.log(err);
          return {error: err, token:null}
        }
          
         return {error: null, token: "success"};
      },

      login: async (email, password) => {
        // extract usrr with particular email id
        if (user === null) {
          const description = "User with email not found";
          api.log(description);
          const error = {
            code: 102,
            description,
            parameter: "email"
          };
          return { error, token: null };
        }
        const passwordHash = crypto
          .createHash("sha256")
          .update(user.password_salt + password)
          .digest("hex");
          
        if (user.password_hash !== passwordHash) {
          const description = "Incorrect password";
          api.log(description);
          const error = {
            code: 104,
            description,
            parameter: "password"
          };
          return { error, token: null };
        }
        const { token } = await api.jwtauth.generateToken(
          { id: user.id },
          { expiresIn: "3h" }
        );
        if (token) {
          return { error: null, token };
        }
        const description = "Token generation error";
        api.log(description);
        const err = {
          code: 103,
          description,
          parameter: "token"
        };
        return { error: err, token: null };
      },
    }
  }
}