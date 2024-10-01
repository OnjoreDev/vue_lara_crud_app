import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

//using an options store
export const usePostsStore = defineStore('postsStore',{
    state:()=>{
        return {
            errors:{}
        }
    },
    //functions for the CRUD app
    actions:{
        /************Get All posts**************/
        async getAllPosts(){
            const res = await fetch("/api/posts");
            const data = await res.json();
            //return the array 
            //console.log(data)
            //obtain the json object
            return data;
        },
        /**********Getting a single post********* */ 
        async getSinglePost(post){
          const resp = await fetch(`/api/posts/${post}`);
          const data = await resp.json();
          //console.log(data);
          return data.post;
        },

        /**************** Create a post **************** */
        async createPost(formData){
            const res = await fetch("/api/posts",{
                method:'post',
                headers:{
                    //include authorization since it is protected by auth
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                //convert js object to string
                body: JSON.stringify(formData)
            })
            
            //convert the result to json 
            const data = await res.json();
            
            //grab errors
            if(data.errors){
                this.errors = data.errors
            }else{
             //console.log(data)
             //redirect to home page
             this.router.push({name:'home'});
            }

        },

        async deletePost(post){
            //check if user owns post
            //then compare logged in user's id to id in post
            const authStore = useAuthStore();
            if(authStore.user.id == post.user_id){
                const resp = await fetch(`/api/posts/${post.id}`,{
                    method:'Delete',
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await resp.json();
    
              //console.log(data)
              if(resp.ok){
                this.router.push({name:"home"})
              }else{
                console.log(data)
              }
            
            }else{
                console.log('You do not own this post.')
            }

        },

        async updatePost(post,formData){
            const authStore = useAuthStore()

            if(authStore.user.id === post.user_id){
            
            const resp = await fetch(`/api/posts/${post.id}`,{
                method:'PUT',
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify(formData),
            });

            //wait for json response from backend
            const data = await resp.json();
            if(data.errors){
                //if errors occurr update state
                this.errors = data.errors

            }else{
                //take user to homepage
                this.router.push({name:"home"})
                //reset errors array toempty object
                this.errors = {}
            }


          }
        },
    
        

    }
});