<script setup>
import New from './components/newTask.vue'
import List from './components/listTask.vue'
import { ref, onMounted, computed } from "vue";
let task = ref([]);
let priorities = ['high', 'medium', 'low'];



onMounted(()=>{
  if(localStorage.tasks)
    task.value = JSON.parse(localStorage.tasks)
})

function localStorageReload(){
  localStorage.tasks=JSON.stringify(task.value)
}

function addTask(name, priority){
  task.value.push({
    name: name.value,
    time: new Date(),
    finished:"Not finished",
    priority: priority.value
  })
  localStorageReload();
}

function deleteTask(index){
  task.value.splice(index,1)
  localStorageReload();
}
function changeStatus(index){
if(task.value[index].finished === "Not finished"){
  task.value[index].finished = "Finished"
}
else{
  task.value[index].finished = "Not finished"

}
  localStorageReload();
}


function deleteAllFinished(){
  task.value = task.value.filter((item)=>{
    return item.finished !== 'Finished';
  })
  localStorageReload()
}

function changePrio(index){
  let newObj = priorities.indexOf(task.value[index].priority);
  if(++newObj > 2) newObj= 0;
  task.value[index].priority = priorities[newObj];
  localStorageReload()
}

</script>

<template>
  <main class="container">
    <h1>To-do App</h1>
    <New @submitTask="addTask"/>
    <List :tasks="task" @deleteTask="deleteTask" @changeStatus="changeStatus" @deleteAllFinished="deleteAllFinished" @changePrio="changePrio"/>
  </main>

</template>



