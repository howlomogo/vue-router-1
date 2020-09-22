<template>
  <div>
      <!-- With just the route we would use -->
      <!-- <h1>Name is {{ $route.params.name }}</h1> -->

      <!-- When props is set to true, the route.params will be set 
      as the component props. -->

      <!-- Basic example, see below for object / function mode -->
      <!-- https://router.vuejs.org/guide/essentials/passing-props.html#object-mode -->
      <h1>Name is {{ name }}</h1>
  </div>
</template>

<script>
export default {
    name: 'PropsView',
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>