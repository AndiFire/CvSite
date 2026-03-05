import './bootstrap';
import {createApp} from 'vue'
import Home from './components/Home.vue'
import BlackHole from './components/BlackHole.vue'

createApp(Home).mount('#app')
createApp(BlackHole).mount('#app')