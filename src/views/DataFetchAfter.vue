<template>
    <div>
        <h1 v-if="loading">
            Loading...
        </h1>
        <h1 v-else-if="fetchErr">
            Error fetching data
        </h1>
        <div style="width: 500px; margin: auto; border: 1px dashed green; padding: 30px;" v-else>
            <div style="margin-bottom: 10px; border: 1px dashed red;" v-for="user in users" :key="user.id">
                <h4>{{ user.name }}</h4>
                <p>{{ user.email }}</p>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'DataFetchAfter',
    created: function() {
        this.fetchData()
    },
    data: function() {
        return {
            loading: false,
            users: [],
            fetchErr: false
        }
    },
    methods: {
        fetchData: function() {
            console.log('Fetching Data...')
            this.loading = true
            
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    this.loading = false
                    this.users = data
                })
                .catch(() => {
                    this.loading = false
                    this.fetchErr = true
                })
        }
    }
}
</script>

<style>

</style>