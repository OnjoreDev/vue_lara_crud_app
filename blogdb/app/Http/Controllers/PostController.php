<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware(){
        return [
            new Middleware('auth:sanctum',except:['index','show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all posts
        return  Post::with('user')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $input =  $request->validate([
            'title'=>'required|max:255',
            'body'=>'required'
         ]);

        //$post = Post::create($input);
       $post = $request->user()->posts()->create($input);

        return response()->json([
            'message'=>'Post added successfully',
            'post'=>$post,
            //user who created post
            //possible because of relationship
            'user'=>$post->user,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
        return[
                'post'=>$post,
                'user'=>$post->user,
                'status'=>200
        ];
           
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        Gate::authorize('modify',$post);
        //
        $inputs = $request->validate([
            'title'=>'required|max:255',
            'body'=>'required'
        ]);

        $post->update($inputs);

        return response()->json([
            'message'=>'Updated successfully',
            'status'=>200,
            'post'=>$post
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //function that prevents deleting anothers post
        Gate::authorize('modify',$post);

        //
        $post->delete();
        return response()->json(
            [
                'message'=>'Post deleted successfully',
                'status'=>200
            ]);
    }
}
