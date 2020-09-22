<template>
  <div id="app">

    <div class="nav">
      <!-- Note you will get an error, 'avoided redundant navigation
      Seems a common issues can use something like this.$router.push("/user/bar").catch(()=>{})
      -->

      <!-- Same thing - <button @click="$router.push('/user/bar')"> -->
      <!-- Completed and Abort functions are NOT needed, just doign as example -->
      <button style="margin-right: 30px;" @click="$router.push(
        { path: '/user/bar' },
        onCompleteTest,
        onAbortTest)">
        Goto '/user/bar' using router.push
      </button>
      <button style="margin-right: 30px;" @click="$router.replace({ path: 'user/bar2' })">
        Goto '/user/bar2' using router.replace
      </button>

      <button style="margin-right: 30px;" @click="$router.go(-2)">
        Use router.go to go back in history by two
      </button>

      <button @click="$router.go(1)">
        Use router.go to go forward in history by one
      </button>

      <p><small>Notice when clicking the back button on REPLACE it just goes to the root `/` as it's NOT pushed to the history, 
        Where as push will push to the history and back button will work</small></p>
    </div>

    <!-- You can make any of these use replace by adding the attribute replace -->
    <!-- <router-link to="/user" replace>User</router-link> -->
    <div class="nav">
      <!-- Link to named route -->
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link to="/query-route?name=matt&age=33">Query</router-link>
    </div>
    <div class="nav">
      <router-link to="/user">User (/wo id)</router-link> |
      <router-link to="/user/foo">User (/w id)</router-link> |
      <router-link to="/user/foo/post/36">User (/w id & post_id)</router-link>
    </div>

    <div class="nav">
      <router-link to="/nested">Nested</router-link> |
      <router-link to="/nested/nestedProfile">Nested Profile</router-link> |
      <!-- Below note the nested paths starts with / will be treated
      as a root path. This allows you to leverage the component nesting
      without having to use a nested URL.
      Below that path IS STILL nested within /nested but the url is just /nestedInfo
      As in the route it's a child, but path starts with /
      -->

      <router-link to="/nestedInfo">Nested Info</router-link>
    </div>

    <!-- With props:true on router, can use this component
    without being tied to the $route object as shown below -->
    <!-- <PropsView name="Qing" /> -->

    <div class="nav">
      <router-link to="/props-view/matt">Props</router-link> | 
      <router-link to="/named">Named</router-link> | 
      <router-link to="/a-really-cool-url">Alias</router-link>
    </div>

    <div class="nav">
      <router-link to="/fetch-data-after">Fetch Data After</router-link>
    </div>

    <!-- component matched by the route will render here -->
    <router-view/>
    <!-- component matched by the route will render here -->
  </div>
</template>

<script>
// import PropsView from './views/PropsView'

export default {
  // components: {
  //   PropsView
  // },
  methods: {
    onCompleteTest: function() {
      console.log('Router Completed')
    },
    onAbortTest: function() {
      // This will fire, if we are on the same route
      console.log('Router Aborted')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 10px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
