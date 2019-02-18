const { Initializer, api } = require("actionhero");
const jsonwebtoken = require("jsonwebtoken");

module.exports = class JWTAuth extends Initializer {
  constructor() {
    super();
    this.name = "jwtAuth";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.jwtauth = {
      async processToken(token) {
        try {
          const data = await jsonwebtoken.verify(
            token,
            api.config.jwtauth.secret,
            {}
          );
          return { error: null, dataObj: data };
        } catch (err) {
          return { error: err, dataObj: null };
        }
      },
      async generateToken(data, options) {
        if (!options.algorithm) {
          options.algorithm = api.config.jwtauth.algorithm;
        }
        try {
          const token = await jsonwebtoken.sign(
            data,
            api.config.jwtauth.secret,
            options
          );
          return { error: null, token };
        } catch (err) {
          api.log(err);
          return { error: err, token: null };
        }
      }
    };
    const jwtMiddleware = {
      name: "ah-jwt-auth",
      global: true,
      preProcessor: async data => {
        // is it required to have a valid token to access an action?
        let tokenRequired = false;
        if (
          data.actionTemplate.authenticate &&
          api.config.jwtauth.enabled[data.connection.type]
        ) {
          tokenRequired = true;
        }
        // get request data from the required sources
        let token = "";
        const req = {
          headers:
            data.params.httpHeaders ||
            (data.connection.rawConnection.req
              ? data.connection.rawConnection.req.headers
              : undefined) ||
            data.connection.mockHeaders ||
            {},
          uri: data.connection.rawConnection.req
            ? data.connection.rawConnection.req.uri
            : {}
        };
        const authHeader =
          req.headers.authorization || req.headers.Authorization || false;
        // extract token from http headers
        if (authHeader) {
          const parts = authHeader.split(" ");
          if (parts.length !== 2 || parts[0].toLowerCase() !== "token") {
            // return error if token was required and missing
            if (tokenRequired) {
              return {
                code: 500,
                message: "Invalid Authorization Header"
              };
            }
            return;
          }
          [token] = parts;
        }
        if (!token && api.config.jwtauth.enableParam && data.params.token) {
          ({ token } = data.params.token);
        }
        // return error if token was missing but marked as required
        if (tokenRequired && !token) {
          return {
            code: 500,
            message: "Authorization Header Not Set"
          };
        }
        if (token) {
          const response = await api.jwtauth.processToken(token);
          const ptErr = response.error;
          const claims = response.dataObj;
          if (!ptErr) {
            data.connection.jwt = {
              token,
              claims
            };
          }
        }
      }
    };
    api.actions.addMiddleware(jwtMiddleware);
  }
};
