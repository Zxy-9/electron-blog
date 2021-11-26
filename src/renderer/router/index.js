import Vue from 'vue'
import Router from 'vue-router'
import fileTest from '../views/file/index.vue'
Vue.use(Router)
 
let router = new Router({
  routes: [
   {
     path: '/',
     name: 'landing-page',
     component: require('@/components/LandingPage').default
   },
   {
   	path:'/file',
   	name: 'file',
   	component:fileTest
   },
   {
     path: '*',
     redirect: '/'
   }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

 
// 渲染进程接收主进程的传参
const { ipcRenderer } = require('electron');
 
ipcRenderer.on('href', (event, arg) => {
  if (arg) {
    router.push({ path: arg });
  }
});
 
export default router
