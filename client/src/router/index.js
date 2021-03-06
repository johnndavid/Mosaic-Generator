import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test';
import Panel from '@/components/Panel'
import LiveConfig from '@/components/LiveConfig'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/panel.html',
      name: 'Panel',
      component:  Panel
    },
    {
      path: '/live_config.html',
      name: 'LiveConfig',
      component:  LiveConfig
    }
  ],
  mode:  'history'
})
