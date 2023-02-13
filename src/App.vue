<script setup>
import New from './components/newTask.vue'
import List from './components/listTask.vue'
import { ref, onMounted, computed } from "vue";
// let task = ref([]);
// let priorities = ['high', 'medium', 'low'];



// onMounted(()=>{
//   if(localStorage.tasks)
//     task.value = JSON.parse(localStorage.tasks)
// })
//
// function localStorageReload(){
//   localStorage.tasks=JSON.stringify(task.value)
// }

// function addTask(name, priority){
//   task.value.push({
//     name: name.value,
//     time: new Date(),
//     finished:"Not finished",
//     priority: priority.value
//   })
//   localStorageReload();
// }
//
// function deleteTask(index){
//   task.value.splice(index,1)
//   localStorageReload();
// }
// function changeStatus(index){
// if(task.value[index].finished === "Not finished"){
//   task.value[index].finished = "Finished"
// }
// else{
//   task.value[index].finished = "Not finished"
//
// }
//   localStorageReload();
// }
//
//
// function deleteAllFinished(){
//   task.value = task.value.filter((item)=>{
//     return item.finished !== 'Finished';
//   })
//   localStorageReload()
// }
//
// function changePrio(index){
//   let newObj = priorities.indexOf(task.value[index].priority);
//   if(++newObj > 2) newObj= 0;
//   task.value[index].priority = priorities[newObj];
//   localStorageReload()
// }
</script>

<template>
  <div>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top">
    <div class="container-fluid">
      <router-link to="/welcome"><a class="navbar-brand text-white">Welcome</a></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/new"><a class="nav-link active text-white">New Task</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/list"><a class="nav-link active text-white">List Task</a></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
  <main class="container">
    <router-view/>
  </main>
</template>



