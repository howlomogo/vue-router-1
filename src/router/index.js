import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Nested from '../views/Nested.vue'
import User from '../views/User.vue'
import Query from '../views/Query.vue'
import NotFound from '../views/NotFound.vue'

import Info from '../components/Info'
import Profile from '../components/Profile'
import NamedViews from '../views/NamedViews'
import PropsView from '../views/PropsView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // You could also use for example something like
    // path: '/nested/:id' will do the same with /nested/36/nestedInfo etc
    path: '/nested',
    children: [
      {
        /* Note that nested paths that start with / will be treated
        as a root path. This allows you to leverage the component
        nesting without having to use a nested URL.
        */
        path: '/nestedInfo',
        component: Info
      },
      {
        path: 'nestedProfile',
        component: Profile
      },
      {
        /* You can (But don't need to) have a default view incase
        the path is just /nested and want to render ALL the views within the
        router-view */
        path: '',
        component: Home
      }
    ],
    component: Nested
  },
  {
    path: '/user',
    component: User
  },
  {
    // '/user' will NOT display this component unless stated as above
    path: '/user/:id',
    component: User
  },
  {
    // You can have multiple dynamic segments in the same route
    // Though I think you can do this with children
    path: '/user/:id/post/:post_id',
    component: User
  },
  {
    path: '/query-route',
    component: Query
  },
  {
    // Get name as props, means we can decouple this component from specific routes
    path: '/props-view/:name',
    component: PropsView,
    props: true
  },
  {
    path: '/named',
    component: NamedViews,
    children: [{
      path: '',
      components: {
        default: Profile,
        a: Info,
        b: Profile
      }
    }]
  },
  {
    // Here for example '/path-with-an-alias' may be a horrible url we can't change,
    // we can just link to any url by using alias, this is NOT redirecting
    path: '/path-with-an-alias',
    component: Home,
    alias: '/a-really-cool-url'
  },
  {
    // With a url of /anycheese - $route.params.pathMatch is "cheese"
    path: '/any*',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history', // default is hash mode
  base: process.env.BASE_URL,
  routes
})

export default router
