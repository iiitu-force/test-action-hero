exports['default'] = {
  routes: (api) => {
    return {

      get: [  
        { path: "/:apiversion/signup", action: "signup" },
        { path: "/:apiversion/", action: "home"}
      ],

      post: [
        {path: "/:apiversion/login", action: "login"},
      ]
    }
  }
}
