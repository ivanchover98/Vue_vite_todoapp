

<script>
export default {
  name: "welcomeTask"
}
</script>


<template>
  <h1>Welcome to To-do App</h1>
  <h3>choose what you would like to do</h3>
  <ul>
    <li><router-link to="/new">New Task</router-link></li>
    <li><router-link to="/list">List Tasks</router-link></li>
  </ul>



</template>



<style scoped>

</style>