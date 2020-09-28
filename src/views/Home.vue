<template>
  <div class="home">
    <h1>This is an home page</h1>
    <p v-if="$route.path === '/nested'">
      This is the child default (nested view) using Home component from /nested
    </p>
    <p>Testing buddy push 3</p>
    <button @click="logRouterInfo">Log Router Info</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  methods: {
    logRouterInfo: function() {
      // We have access to router info
      console.log(this.$router)
      console.log(this.$route)
    }
  }
}
</script>
