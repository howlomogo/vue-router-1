<template>
  <div class="home">
    <h1>This is an home page</h1>
    <hr />
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
