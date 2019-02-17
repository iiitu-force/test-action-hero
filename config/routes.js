exports['default'] = {
  routes: (api) => {
    return {

      get: [  
        { path: "/:apiversion/signup", action: "signup" },
      ],

      post: [
        {path: "/:apiversion/login", action: "login"},
      ]

      // get: [
      //   { path: "/:apiversion/home", action: "home"}
      // ]
    }
  }
}
