<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';


//to use the state variable without using reactivity
const { errors } = storeToRefs(useAuthStore());

//since we only need authenticate we destructure the useStore Object
const { authenticate } = useAuthStore();


const formData = reactive({
   
    email:"",
    password:"",
})

//remove any unneccessary errror messages on loading page
//since its a ref we use the errors.value 
onMounted(()=> (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Login to your account</h1>
    <form class="w-1/2 mx-auto space-y-6" @submit.prevent="authenticate('login',formData)">
         <div>
        <input type="email" placeholder="Email" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>

        </div>
        <div>
        <input type="password" placeholder="Password" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

        </div>
         <button class="primary-btn">Login</button>
    </form>
 </main>
</template>
