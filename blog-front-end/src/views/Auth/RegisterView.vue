<script setup>
import { onMounted,reactive } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';

//const authStore = useAuthStore()
//we want to access error state variable
//we cannot destructure state variables so we create a
//const variable to hold the entirestore ancd call it as a parameter of the object
//const authStore = useAuthStore(); 

//to use the state variable without using reactivity
const { errors } = storeToRefs(useAuthStore());

//since we only need authenticate we destructure the useStore Object
const { authenticate } = useAuthStore();


const formData = reactive({
    name:"",
    email:"",
    password:"",
    password_confirmation:""
})

//remove any unneccessary errror messages on loading page
//since its a ref we use the errors.value 
onMounted(()=> (errors.value = {}));


</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>
    <form class="w-1/2 mx-auto space-y-6" @submit.prevent="authenticate('register',formData)">
        <div>
        <input type="text" placeholder="Name" v-model="formData.name">
        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
        </div>
        <div>
        <input type="email" placeholder="Email" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>

        </div>
        <div>
        <input type="password" placeholder="Password" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

        </div>
        <div>
        <input type="password" placeholder="Confirm Password" v-model="formData.password_confirmation">
        </div>
        <button class="primary-btn">Register</button>
    </form>
 </main>
</template>
