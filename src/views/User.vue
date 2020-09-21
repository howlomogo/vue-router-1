<template>
  <div class="home">
    <h1>This is a user page</h1>
    <!-- You can have multiple routes to 1 component set in the router index -->
    <p v-if="Object.keys($route.params).length !== 0">
        The params for this page are {{ $route.params }}
    </p>
    <p v-else>
        No params
    </p>
    <router-link to="/info">Info</router-link>
  </div>
</template>


<script>
export default {
    watch: {
        $route(to, from) {
            // react to route changes, note this will ONLY work when moving between the same route
            // so coming from /home to /user WILL NOT call this
            // coming from '/user/foo' -> '/user/foo/post/5' OR '/user' -> '/user/foo' etc WILL
            console.log('---to', to)
            console.log('---from', from)
            if(from.params.post_id === undefined && to.params.post_id) {
                alert('You came from a non post_id page to a post_id page')
            }
        }
    }
}
</script>