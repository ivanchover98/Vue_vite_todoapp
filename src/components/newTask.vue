<script setup>
  import {ref} from 'vue';

  let priorities = ['high', 'medium', 'low'];
  let priority = ref("");
  let name = ref("");

  const emit = defineEmits(["submitTask"]);
  function submitTask(){
    emit("submitTask", name, priority)
    name.value = "";
    priority.value = "";
  }
</script>

<template>
  <h3>Create task</h3>
  <label for="name">Task Name:</label>
  <input v-model="name" type="text" placeholder="Enter a task" class="form-control">
  <label for="prior">Priority</label>
  <select id="prior" class="form-select" v-model="priority">
    <option v-for="priority in priorities" :value="priority">
      {{ priority }}
    </option>
  </select>
  <button @click="submitTask" class="btn btn-warning rounded-0 mx-1 my-2">Submit</button>
</template>