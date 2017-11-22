import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
window.mapboxgl = require('mapbox-gl');
import './main.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
