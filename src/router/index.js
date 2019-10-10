import Vue from 'vue'
import Router from 'vue-router'
import water from '@/components/water/water.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'water',
      component: water
    }
  ]
})
