import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TheInput from '@/components/form/TheInput';
import TheButton from '@/components/form/TheButton';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'

createApp(App)
  .component('TheInput', TheInput)
  .component('TheButton', TheButton)
  .use(store)
  .use(router)
  .mount('#app')
