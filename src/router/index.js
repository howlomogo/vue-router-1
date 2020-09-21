import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import User from '../views/User.vue'
import Query from '../views/Query.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
