# vue-router-1
Project built with VueCLI using manual options and adding Router

For lots of examples on vue router see https://github.com/vuejs/vue-router in examples

`<router-link>` will be rendered as an `<a>` tag by default

By injecting the router, we get access to it as this.$router
as well as the current route as this.$route inside of any component
```
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```


Reacting to Params Changes
https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
One thing to note when using routes with params is that when the user navigates from /user/foo to /user/bar, the same component instance will be reused. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. **However, this also means that the lifecycle hooks of the component will not be called.**

To react to params changes in the same component, you can simply watch the $route object:
```
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // react to route changes...
    }
  }
}
```
Or, use beforeRouteUpdate
```
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

Catch all / 404 Not found Route
If we want to match anything, we can use the asterisk (*):
Make sure these type of routes are at the end

{
  // will match everything - This is usually used to 404 client side
  path: '*'
}
{
  // will match anything starting with `/user-`
  path: '/user-*'
}

pathMatch - when using asterisk is added to $route.params
When using an asterisk, a param named pathMatch is automatically added to $route.params. It contains the rest of the url matched by the asterisk:
```
// Given a route { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'

// Given a route { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

Matching Priority
Sometimes the same URL may be matched by multiple routes. In such a case the matching priority is determined by the order of route definition: the earlier a route is defined, the higher priority it gets.