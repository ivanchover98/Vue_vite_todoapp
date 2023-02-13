import { createApp } from 'vue'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen);

import './assets/main.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
createApp(App).mount('#app')
