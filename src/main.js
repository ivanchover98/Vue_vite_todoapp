import { createApp } from 'vue'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { createRouter, createWebHistory } from "vue-router";
import List from './components/listTask.vue'
import New from './components/newTask.vue'
import Welcome from './components/welcomeTask.vue'

const routes = [
    {
        path: '/new',
        component: New
    },{
        path: '/list',
        component: List
    },{
        path: '/welcome',
        component: Welcome
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

library.add(faTrash, faPen);

import './assets/main.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
createApp(App).use(router).mount('#app')

