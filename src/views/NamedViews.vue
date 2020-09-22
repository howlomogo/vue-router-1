<template>
    <div style="border: dashed 1px purple; padding: 30px;">
        <router-view />
        <router-view name="a"></router-view>
        <router-view name="b"></router-view>
    </div>
</template>

<script>
export default {
    name: 'NamedViews'
}
</script>

<style>

</style>