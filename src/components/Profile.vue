<template>
    <div style="border: 1px dashed red;">
        <h1>This is the Profile component</h1>
        <p>{{ $route.path }}</p>
    </div>
</template>

<script>
export default {
    name: 'Profile'
}
</script>