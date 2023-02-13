

<script setup>
  import {ref, onMounted} from 'vue';
  let task = ref([]);
  let priorities = ['high', 'medium', 'low'];
  let priority = ref("");
  let name = ref("");

  const props = defineProps(['task'])
  // const emit = defineEmits(["submitTask"]);

  onMounted(()=>{
    if(localStorage.tasks)
      task.value = JSON.parse(localStorage.tasks)
  })

  function addTask(name, priority){
    task.value.push({
      name: name,
      time: new Date(),
      finished:"Not finished",
      priority: priority
    })
    localStorageReload();
  }
  function localStorageReload(){
    localStorage.tasks=JSON.stringify(task.value)
  }
</script>

<template>
  <h3 class="d-sm-none d-lg-inline d-xl-inline d-md-none">Create a task</h3>
  <br>
  <label for="name">Task Name:</label>
  <input v-model="name" type="text" placeholder="Enter a task" class="form-control">
  <label for="prior">Priority</label>
  <select id="prior" class="form-select" v-model="priority">
    <option v-for="priority in priorities" :value="priority">
      {{ priority }}
    </option>
  </select>
  <button @click="addTask(name, priority)" class="btn btn-warning rounded-0 mx-1 my-2">Submit</button>
</template>