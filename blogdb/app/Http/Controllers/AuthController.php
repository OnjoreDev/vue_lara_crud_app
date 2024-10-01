<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $input = $request->validate([
            'name'=>'required|max:255',
            'email'=>'required|email|unique:users',
            'password'=>'required|confirmed'
        ]);

        //save user data
        $user = User::create($input);
        
        //create the API token based on the name property
        $token = $user->createToken($request->name);

        return response()->json([
            'user'=>$user,
            'token'=>$token->plainTextToken
        ]);
    }


    public function login(Request $request){
        $request->validate([
        'email'=>'required|email|exists:users',
        'password'=>'required'
       ]);
       
       //find a user with the email and return it in an object format using first()
       $user = User::where('email',$request->email)->first();

       //check if entered password matches whats in the db 
       //if user does not exist or password does not match 
       if(!$user || !Hash::check($request->password, $user->password)){
           return response()->json([
            //laravel error syntax
            'errors'=>[
                'email'=>['The provided credentials are incorrect']
            ]
           ]);
       }

       //give the user a token
       $token = $user->createToken($user->name);
       
       return response()->json([
        'user'=>$user,
        'token'=>$token->plainTextToken
       ]);
       
    }

    public function logout(Request $request){
       //Delete the user tokens of the logged in user
        $request->user()->tokens()->delete();

        return response()->json(
            [
                'message'=>'You are logged out successfully.'
            ]
        );

    }
}
