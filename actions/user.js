"use strict";
const jsesc = require("jsesc");
const { Action, api } = require("actionhero");

exports.Signup = class Signup extends Action {
  constructor() {
    super();
    this.name = "signup";
    this.description = "I add a user";
    this.inputs = {
      firstName: {
        required: true,
        validator: param => {
          if (!/^([A-Za-z0-9\_]+)$/.test(param)) {
            throw new Error(
              "Invalid First Name: First name should only contain numbers, letters and underscore (_)"
            );
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      lastName: {
        required: false,
        validator: param => {
          if (!/^([A-Za-z0-9\_]*)$/.test(param)) {
            throw new Error(
              "Invalid Last Name: Last name should only contain numbers, letters and underscore (_)"
            );
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      password: {
        required: true,
        validator: param => {
          if (param.length < 8) {
            throw new Error(
              "Invalid Password: Password too short, minimum 8 characters"
            );
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      email: {
        required: true,
        validator: param => {
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(param)) {
            throw new Error("Invalid Email: Please enter valid email");
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      branch: {
        required: true,
        validator: param => {
          if (
            !/^\b(Computer Science|Electronics and Communication Engineering| Information Technology)\b$/.test(
              param
            )
          ) {
            throw new Error(
              "Invalid Branch, should only be Computer Science, Electronics and Communication Engineering or Information Technology"
            );
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      rollNo: {
        required: false
      },
      organization: {
        required: true
      },
      contactNumber: {
        required: true
      }
    };
    this.authenticated = false;
    this.outputExample = {};
    this.version = "v1";
  }

  async run(data) {
    const { error, token } = await api.users.signup(
      data.params.firstName,
      data.params.lastName,
      data.params.password,
      data.params.branch,
      data.params.email,
      data.params.rollNo,
      data.params.organization,
      data.params.contactNumber
    );
    console.log("outside error");

    if (error) {
      console.log("in error");
      data.response.status = 400;
      data.response.error =
        "user not created kindly recheck your email or Roll NUmber";
      data.response.data = {};
    } else {
      console.log("in not error");
      data.response.status = 200;
      data.response.error = {};
      data.response.data = { token };
    }
  }
};

exports.Login = class Login extends Action {
  constructor() {
    super();
    this.name = "login";
    this.description = "I authenticate a user";
    this.inputs = {
      email: {
        required: true,
        formatter: param => jsesc(String(param))
      },
      password: {
        required: true,
        formatter: param => jsesc(String(param))
      }
    };
    this.authenticated = false;
    this.outputExample = {};
    this.version = "v1";
  }

  async run(data) {
    const { error, token } = await api.users.login(
      data.params.email,
      data.params.password
    );
    if (error) {
      data.response.status = 400;
      data.response.error = error;
      data.response.data = {};
    } else {
      data.response.status = 200;
      data.response.error = {};
      data.response.data = { token };
    }
  }
};

exports.Home = class Home extends Action {
  constructor() {
    super();
    this.name = "home";
    this.description = "I am home";
    this.version = "v1";
  }

  async run(data) {
    const { error, token } = await api.users.home(
    );
    if (error) {
      data.response.status = 400;
      data.response.error = error;
      data.response.data = {};
    } else {
      data.response.status = 200;
      data.response.error = {};
      data.response.data = { token };
    }
  }
};