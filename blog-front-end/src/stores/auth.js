import { defineStore } from "pinia";

/***Auth Store***/
//options store ///
export const useAuthStore = defineStore('authStore',{
    state:()=>{
        return {
            user:null,
            errors:{}
        }
    },
   
   //where functions will be defined
    actions:{
       //********Get Authenticated user********** */
       async getUser(){
        //get user if token is in localStorage
        if(localStorage.getItem('token')){
            const res = await fetch('/api/user',{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            //get data and convert it to json
            const data = await res.json();

            if(res.ok){
                this.user = data
            }
            //console.log(data)
        }   
       },



       //for login and register 
      async authenticate(apiRoute,formData){
          const res = await fetch(`/api/${apiRoute}`,
            {
                method:'post',
                body:JSON.stringify(formData),
            })
          
            const data = await res.json();
            if(data.errors){
                //fill errors state with any potential errors
                this.errors = data.errors
            }else{
              //response from backend  
              //console.log(data);
              //reset errors if everything is ok
              this.errors = {}
              //save token in localstorage
              localStorage.setItem('token',data.token)
             //assign value to user state variable
              this.user = data.user
              //redirect
              this.router.push({ name:'home'});

            }
       } ,  

       //function for logging out user
       //this is a protected route hence we need an authorization header
       async logout(){

        const res = await fetch('/api/logout',{
            method:'post',
            headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        
        const data = await res.json();

        console.log(data);

        //reset state variables to initial state
        if(res.ok){
            this.user = null
            this.errors ={}
            //remove token fromlocalStorage
            localStorage.removeItem("token")
            //take user back to homepage
            this.router.push({ name:"home"})
        }
       }

       

    }

    
}) 