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


### Reacting to Params Changes
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

### Matching Priority
Sometimes the same URL may be matched by multiple routes. In such a case the matching priority is determined by the order of route definition: the earlier a route is defined, the higher priority it gets.

### Nested Routes
https://router.vuejs.org/guide/essentials/nested-routes.html#nested-routes
A rendered component can also contain it's own nested <router-view>. This is where the children of a component are rendered.

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

Note that nested paths that start with / will be treated as a root path. This allows you to leverage the component nesting without having to use a nested URL.

### Programmatic Navigation
https://router.vuejs.org/guide/essentials/navigation.html#programmatic-navigation

To navigate to a different URL programmatically, use $router.push, this pushes a new entry into the history stack so when a user clicks the browser back button they will be taken to the previous url, this IS the method used interally when you click a <router-link>

The argument can be a string path, or a location descriptor object. Examples:
```
// literal string path
router.push('home')

// object
router.push({ path: 'home' })

// named route
router.push({ name: 'user', params: { userId: '123' } })

// with query, resulting in /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
```

Note: PARAMS ARE IGNORED IF A PATH IS PROVIDED, which is not the case for query, as shown in the example above. Instead, you need to provide the name of the route or manually specify the whole path with any parameter.

The same rules apply for the to property of the router-link component.

```
router.push(location, onComplete?, onAbort?)
```
Optionally provide onComplete and onAbort callbacks to router.push or router.replace as the 2nd and 3rd arguments. These callbacks will be called when the navigation either successfully completed (after all async hooks are resolved), or aborted (navigated to the same route, or to a different route before current navigation has finished), respectively. In 3.1.0+, you can omit the 2nd and 3rd parameter and router.push/router.replace will return a promise instead if Promises are supported.


**Note: If the destination is the same as the current route and only params are changing (e.g. going from one profile to another /users/1 -> /users/2), you will have to use beforeRouteUpdate to react to changes (e.g. fetching the user information).**

### Router Replace
```
router.replace(location, onComplete?, onAbort?)
```
It acts like router.push, the only difference is that it navigates without pushing a new history entry, as its name suggests - it replaces the current entry.

Router Go
router.go(n)
This method takes a single integer as parameter that indicates by how many steps to go forwards or go backwards in the history stack, similar to window.history.go(n).

### Examples
```
// go forward by one record, the same as history.forward()
router.go(1)

// go back by one record, the same as history.back()
router.go(-1)

// go forward by 3 records
router.go(3)

// fails silently if there aren't that many records.
router.go(-100)
router.go(100)
```

### Named Routes
Sometimes it is more convenient to identify a route with a name, especially when linking to a route or performing navigations. You can give a route a name in the routes options while creating the Router instance.
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
To link to a named route, you can pass an object to the router-link component's to prop:, **Notice the ':to' not 'to', to pass an object**
```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```
This is the exact same object used programmatically with router.push():
```
router.push({ name: 'user', params: { userId: 123 }})
```
In both cases, the router will navigate to the path /user/123.

### Named Views
Sometimes you need to display multiple views at the same time instead of nesting them, e.g. creating a layout with a sidebar view and a main view. This is where named views come in handy. Instead of having one single outlet in your view, you can have multiple and give each of them a name. A router-view without a name will be given default as its name.

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

A view is rendered by using a component, therefore multiple views require multiple components for the same route. Make sure to use the components (with an s) option:

```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
See example for basic view: https://jsfiddle.net/posva/6du90epg/

^ I'm not really sure where this example would be useful as surely you would always need to specify a component to render that view (As shown below).
```
{
  path: '/settings',
  // You could also have named views at the top
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

### Redirect
Redirecting is also done in the routes configuration. To redirect from /a to /b:
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```
The redirect can also be targeting a named route:
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```
Or even use a function for dynamic redirecting:
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // the function receives the target route as the argument
      // return redirect path/location here.
    }}
  ]
})
```
Note that Navigation Guards are not applied on the route that redirects, only on its target.

### Alias
A redirect means when the user visits /a, the URL will be replaced by /b, and then matched as /b. But what is an alias?

An alias of /a as /b means when the user visits /b, the URL remains /b, but it will be matched as if the user is visiting /a.

The above can be expressed in the route configuration as:
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```
An alias gives you the freedom to map a UI structure to an arbitrary URL, instead of being constrained by the configuration's nesting structure.


### Passing Props to Route Components
This looks really useful, say for example we have a info component which gives details from the url using $route eg id, and displays it in the component. We would HAVE to be hitting that route in order to get the id. Say we then want to use the sam component, but for a admin info page and we use a different route which doesn;t pass in the id. The component would break / not work.

Learn how to pass props to route components with a free lesson on Vue School
Using $route in your component creates a tight coupling with the route which limits the flexibility of the component as it can only be used on certain URLs.

To decouple this component from the router use option props:

Instead of coupling to $route:
```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```
Decouple it by using props
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // for routes with named views, you have to define the `props` option for each named view:
    {
      path: '/user/:id',
      components: {
        default: User,
        sidebar: Sidebar
      },
      props: {
        default: true,
        // function mode, more about it below
        sidebar: route => ({ search: route.query.q })
      }
    }
  ]
})
```

This allows you to use the component anywhere, which makes the component easier to reuse and test.

Boolean mode
When props is set to true, the route.params will be set as the component props.

Object mode
When props is an object, this will be set as the component props as-is. Useful for when the props are static.
```
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
})
```

#Function mode
You can create a function that returns props. This allows you to cast parameters into other types, combine static values with route-based values, etc.
```
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```
The URL /search?q=vue would pass {query: 'vue'} as props to the SearchUser component.

Try to keep the props function stateless, as it's only evaluated on route changes. Use a wrapper component if you need state to define the props, that way vue can react to state changes.

### History Mode / Server Configurations
https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode

## Navigation Guards
https://router.vuejs.org/guide/advanced/navigation-guards.htm
Useful for auth / checking route data before loading route.

The Full Navigation Resolution Flow
- Navigation triggered.
- Call beforeRouteLeave guards in deactivated components.
- Call global beforeEach guards.
- Call beforeRouteUpdate guards in reused components.
- Call beforeEnter in route configs.
- Resolve async route components.
- Call beforeRouteEnter in activated components.
- Call global beforeResolve guards.
- Navigation confirmed.
- Call global afterEach hooks.
- DOM updates triggered.
- Call callbacks passed to next in beforeRouteEnter guards with instantiated instances.