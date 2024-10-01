<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

//reactive user
//N?B destructuring a state variable you use storeToRefs
const { user } =storeToRefs(useAuthStore())

//reactive errors
const { errors } = storeToRefs(usePostsStore())

//destructure updatePost
// const { updatePost } = usePostsStore();


//get router to redirect user to new page
const router = useRouter()
//get id from url
const route = useRoute();
const { getSinglePost,updatePost } = usePostsStore()
const post = ref(null)

const formData = reactive({
    title:'',
    body:''
});

onMounted(async()=>{

   //get the post and assign it to post 
   post.value = await getSinglePost(route.params.id)

    //checking authorization
   //check if authenticated user id is similar to post id
   if(user.value.id !== post.value.user_id){
     //redirect to homepage
     router.push({ name:"home"})
   }else{
   //populate the form by
   //setting form values
    formData.title = post.value.title
    formData.body = post.value.body
   }

})

</script>
<template>
    <main>
        <h1 class="title">Update Post</h1>
        <form @submit.prevent="updatePost(post, formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Post Title" v-model="formData.title">
                <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
            </div>

            <div>
                <textarea rows="6" placeholder="Post Content" v-model="formData.body"></textarea>
                <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
            </div>

            <button class="primary-btn">
                Update
            </button>
        </form>
    </main>
</template>