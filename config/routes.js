exports['default'] = {
  routes: (api) => {
    return {

      get: [
        { path: "/:apiversion/signup", action: "signup" },
      ]
    }
  }
}
