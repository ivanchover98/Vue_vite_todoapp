<script setup>
import {ref, computed} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const props = defineProps(['tasks'])
let finishedStatues = ['Not finished', 'Finished', 'All']
let finishedShow = ref('');
let taskName = ref('');
const emit = defineEmits(["deleteTask", "changeStatus", "deleteAllFinished", "changePrio"])
function deleteTask(id){
  emit("deleteTask", id)
}

function changeStatus(id){
  emit("changeStatus", id)
}

const filter = computed(() => {
  if (props.tasks===[]) return
  let filter = props.tasks;
  if (finishedShow.value === "Finished") {
    filter = filter.filter(task => task.finished === "Finished");
    console.log(filter.length)
  } else if (finishedShow.value === "Not finished") {
    filter = filter.filter(task => task.finished === "Not finished");
    console.log(filter.length)
  }
  //También se encarga de filtrar por el input de busqueda.
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

function deleteAllFinished(){
  emit('deleteAllFinished')
}

const countFinishedTasks = computed(()=>{
  if (props.tasks===[]) return
  return props.tasks.filter(task => task.finished === 'Finished').length;
})

function changePrio(id){
  emit('changePrio', id)
}

function timePastCreation(date){
  const currentTime = new Date().getTime();
  const time = new Date(date).getTime();
  return Math.floor((currentTime - time)/60000);
}


</script>
<template>
  <button class="btn btn-danger" @click="deleteAllFinished">Delete All Finished</button>
  <h3>Filters</h3>
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
  <footer class="sticky-xl-bottom d-flex justify-content-around p-4 bg-danger mt-3">
    <span class="text-white">Contador de tareas: {{ tasks.length }}</span>
    <span class="text-white">Contador de tareas finalizadas: {{ countFinishedTasks }}</span>
  </footer>
</template>

<style scoped>
.through{
  text-decoration: line-through;
}
</style>