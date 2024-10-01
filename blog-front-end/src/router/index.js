import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/register',
      name:'register',
      component: ()=>import('@/views/Auth/RegisterView.vue'),
      //only visible for unauthenticated users
      meta:{ guest:true }
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/Auth/LoginView.vue'),
      //only visible for unauthenticated users
      meta:{ guest:true }
    },
    {
      path:'/create',
      name:'create',
      component:()=>import('@/views/Posts/CreatePost.vue'),
      //make route accessible to logged in users
      meta:{ auth:true }
    },
    {
      path:'/posts/show/:id',
      name:'show',
      component:()=>import('@/views/Posts/ShowPost.vue'),
    },
    {
      path:'/posts/update/:id',
      name:'update',
      component:()=>import('@/views/Posts/UpdatePost.vue'),
      meta:{auth:true}
    }

  ]
})

//Route Guards
//guard routes
router.beforeEach(async (to,from)=>{
  //if user is authentciated show the proper route based on the state
  const authStore = useAuthStore()
  await authStore.getUser()

  //check if user is logged in and meta is guest return them to homepage
  //so that they dont have to access the page with meta guest
  if(authStore.user && to.meta.guest){
    return { name: 'home' }
  }

  //if a user is not logged in and his meta is auth
  //an unauthenticated user should not access a route reserved only for logged in users
  if(!authStore.user && to.meta.auth){
    return { name:"login" }
  }
})

export default router
