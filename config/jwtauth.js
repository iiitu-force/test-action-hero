/**
 * @Author: Guan Gui <guiguan>
 * @Date:   2016-08-27T21:14:26+10:00
 * @Email:  root@guiguan.net
 * @Last modified by:   guiguan
 * @Last modified time: 2016-09-10T11:46:23+10:00
 */

exports.default = {
    jwtauth(api) {
      return {
        enabled: {
          web: true,
          websocket: true,
          socket: false,
          testServer: false
        },
        secret: "46BFC22F7211E21A9F67D7214712952F0B330407854272B2E41E18B9EFC1AF59",
        algorithm: "HS256",
        enableParam: false // enables token as action param in addition to Authorization headers
      };
    }
  };
  
  exports.test = {
    jwtauth(api) {
      return {
        enabled: {
          web: false,
          websocket: false,
          socket: false,
          testServer: false
        },
        secret: "46BFC22F7211E21A9F67D7214712952F0B330407854272B2E41E18B9EFC1AF59",
        algorithm: "HS256",
        enableParam: false // enables token as action param in addition to Authorization headers
      };
    }
  };
  
  exports.production = {
    jwtauth(api) {
      return {
        enabled: {
          web: true,
          websocket: true,
          socket: false,
          testServer: false
        },
        secret: ``, // make this a 512 bit
        algorithm: "HS256",
        enableParam: false // enables token as action param in addition to Authorization headers
      };
    }
  };
  