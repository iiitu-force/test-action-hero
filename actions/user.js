'use strict'
const jsesc = require("jsesc");
const { Action, api } = require('actionhero')

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
          if (!/^\b(Computer Science|Electronics and Communication Engineering| Information Technology)\b$/.test(param)) {
            throw new Error(
              "Invalid Branch, should only be Computer Science, Electronics and Communication Engineering or Information Technology"
            );
          }
          return true;
        },
        formatter: param => jsesc(String(param))
      },
      token: {
        required: false
      }
    };
    this.authenticated = false;
    this.outputExample = {};
    this.version = "v1";
  }

  async run(data) {
    const { error, token } = await api.users.add(
      data.params.firstName,
      data.params.lastName,
      data.params.password,
      data.params.plan,
      data.params.email,
      data.params.token
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
