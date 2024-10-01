<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

// //this will be displayed on console
// onMounted(()=>{
//   authStore.getUser();
// })

</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{ name:'home'}" class="nav-link">Home</RouterLink>

        <!-- <p v-if="authStore.user" class="text-white" > {{ authStore.user.name }}</p> -->
         <div v-if="authStore.user" class="flex items-center space-x-6">
          <p class="text-sm text-slate-300">
            Welcome back {{ authStore.user.name }}
          </p>
          <RouterLink :to="{ name:'create' }" class="nav-link">New Post</RouterLink>

          <!----logout-->
            <!----we dont have to use an anonymous function because there are no params in logout-->
            <form @submit.prevent="authStore.logout">
              <button class="nav-link">Logout</button>
            </form>   
          </div>
        <!---show this is user is not logged in-->  
        <div v-else class="space-x-6">
          <RouterLink :to="{ name:'register' }" class="nav-link">Register</RouterLink>
          <RouterLink :to="{ name:'login' }" class="nav-link">Login</RouterLink>
        </div>
      </nav>
  </header>

  <RouterView />
</template>

