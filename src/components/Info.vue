<template>
    <div style="border: 1px dashed green;">
        <h1>This is the Info component</h1>
        <p>{{ $route.path }}</p>
    </div>
</template>

<script>
export default {
    name: 'Info'
}
</script>