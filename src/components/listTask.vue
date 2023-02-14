<script setup>
import {ref, computed, onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import New from './newTask.vue'

//Variables App.vue
let tasks = ref([]);
let priorities = ['high', 'medium', 'low'];




// const props = defineProps(['tasks'])
let finishedStatues = ['Not finished', 'Finished', 'All']
let finishedShow = ref('');
let taskName = ref('');



onMounted(()=>{
  if(localStorage.tasks)
    tasks.value = JSON.parse(localStorage.tasks)
})

function localStorageReload(){
  localStorage.tasks=JSON.stringify(tasks.value)
}

function deleteTask(index){
  tasks.value.splice(index,1)
  localStorageReload();
}
function changeStatus(index){
  if(tasks.value[index].finished === "Not finished"){
    tasks.value[index].finished = "Finished"
  }
  else{
    tasks.value[index].finished = "Not finished"

  }
  localStorageReload();
}
function deleteAllFinished(){
  tasks.value = tasks.value.filter((item)=>{
    return item.finished !== 'Finished';
  })
  localStorageReload()
}
function changePrio(index){
  let newObj = priorities.indexOf(tasks.value[index].priority);
  if(++newObj > 2) newObj= 0;
  tasks.value[index].priority = priorities[newObj];
  localStorageReload()
}


const filter = computed(() => {
  if (tasks.value===[]) return
  let filter = tasks.value;
  if (finishedShow.value === "Finished") {
    filter = filter.filter(task => task.finished === "Finished");
    console.log(filter.length)
  } else if (finishedShow.value === "Not finished") {
    filter = filter.filter(task => task.finished === "Not finished");
    console.log(filter.length)
  }
  if(taskName.value){
    filter= filter.filter(task => task.name.toLowerCase().includes(taskName.value.toLowerCase()));
  }
  filter.sort((a,b) =>{
    if (a.priority === 'high' && b.priority !== 'high') {
      return -1;
    }
    if (a.priority === 'medium' && b.priority === 'low') {
      return -1;
    }
    if (a.priority === 'low' && b.priority !== 'low') {
      return 1;
    }
    return 0;
  });

  return filter;
});

const countFinishedTasks = computed(()=>{
  if (tasks.value===[]) return
  return tasks.value.filter(task => task.finished === 'Finished').length;
})

function timePastCreation(date){
  const currentTime = new Date().getTime();
  const time = new Date(date).getTime();
  return Math.floor((currentTime - time)/60000);
}


</script>
<template>

  <h3 class="d-sm-none d-lg-inline d-xl-inline d-md-none">List Task</h3>
  <div class="my-2 mt-4">
    <p>Status Filter</p>
    <select id="filterStatus" class="form-select" v-model="finishedShow">
      <option v-for="finished in finishedStatues" :value="finished">
        {{ finished }}
      </option>
    </select>
    <p>Name filter</p>
    <input v-model="taskName" type="text" placeholder="Filter name task" class="form-control">
  </div>
<!--  <div v-if="tasks.length">-->
    <div>
      <table class="table table-bordered mt-4">
        <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Creation time</th>
          <th scope="col">Status</th>
          <th scope="col">Priority</th>
          <th scope="col" class="text-center">Delete</th>
          <th scope="col">Time past from to creation</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task, index) in filter" :key="index">
          <td :class="{'through': task.finished === 'Finished'}"> {{ task.name }}</td>
          <td> {{ task.time }} </td>
          <td @click="changeStatus(index)"
          :class="{'text-danger': task.finished === 'Not finished',
          'text-success': task.finished === 'Finished'}">
            {{ task.finished }}
          </td>
          <td @click="changePrio(index)"> {{ task.priority }} </td>
          <td>
            <button @click="deleteTask(index)">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
          <td>{{ timePastCreation(task.time) }} min </td>
        </tr>
        </tbody>
      </table>
    </div>
  <button class="btn btn-danger" @click="deleteAllFinished">Delete All Finished</button>
  <footer class="sticky-xl-bottom d-flex justify-content-around p-4 bg-primary mt-3">
    <span class="text-white">Contador de tareas: {{ tasks.length }}</span>
    <span class="text-white">Contador de tareas finalizadas: {{ countFinishedTasks }}</span>
  </footer>
</template>

<style scoped>
.through{
  text-decoration: line-through;
}
</style>