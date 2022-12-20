<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Validator;
use Response;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /*
    ###################################
    Count number of posts for this user
    ###################################
    */

    public function countPosts() {
        // Counts the number of posts for this user
        if (Auth::check()) { //to check if user is logged in
            $id = Auth::user()->id;
            $count = Post::where('user_id', $id)->count();
            return $count;
        }
        else{
            return 'You are not logged in';
        }
        
    }

    /*
    #################
    Getting all posts
    #################
    */

    public function getAllPosts() {
        // Returns all posts from the database with the user that created it
        $posts = Post::all();
        $post_details = [];
        
        // Looping through all the posts and getting the user that created it and saving them in an array
        foreach ($posts as $post) {
            $user = User::where('id', $post->user_id)->get();
            $post_details[] = [
                'post' => $post,
                'user' => $user
            ];
        }
        return $post_details;
    }

    /*
    ###################
    Creating a new post
    ###################
    */

    public function createPost(Request $request) {
        // Creates a new post
        if (Auth::check()) { //to check if user is logged in
            $validator = Validator::make($request->all(), [
                'skill_to_offer' => 'required',
                'skill_to_learn' => 'required',
                'offer_time' => 'required',
            ]);
            if ($validator->fails()) {
                return Response::json($validator->errors()->toJson(), 422);
            }
            // Creating the new post
            $post = new Post;
            $post->skill_to_offer = $request->skill_to_offer;
            $post->skill_to_learn = $request->skill_to_learn;
            $post->offer_time = $request->offer_time;
            $post->user_id = Auth::user()->id; //getting the user id of the logged in user
            // Ensuring a successful save
            if($post->save()){
                return Response::json([
                    "status" => "success",
                    "results" => $post
                ], 200);
            }else{
                return Response::json([
                    "status" => "failure",
                    "results" => []
                ], 400);
            }
        }
        else{
            return Response::json([
                "status" => "failure",
                "message" => "You are not logged in"
            ], 400);
        }
        
    }

    /*
    ####################
    Getting user's posts
    ####################
    */

    public function getUserPosts() {
        // Returns all posts from the database with the user that created it
        if (Auth::check()) { //to check if user is logged in
            $id = Auth::user()->id;
            $posts = Post::where('user_id', $id)->get();
            $post_details = [];
            
            // Looping through all the posts and getting the user that created it and saving them in an array
            foreach ($posts as $post) {
                $user = User::where('id', $post->user_id)->get();
                $post_details[] = [
                    'post' => $post,
                    'user' => $user
                ];
            }
            return $post_details;
        }
        else{
            return Response::json([
                "status" => "failure",
                "message" => "You are not logged in"
            ], 400);
        }
        
    }

    /*
    ######################
    Deleting selected post
    ######################
    */

    public function deletePost(Request $request) {
        // Deletes a post
        if (Auth::check()) { //to check if user is logged in
            $validator = Validator::make($request->all(), [
                'post_id' => 'required',
            ]);
            if ($validator->fails()) {
                return Response::json($validator->errors()->toJson(), 422);
            }
            // Deleting the post
            $post = Post::find($request->post_id);
            // Ensuring a successful delete
            if($post->delete()){
                return Response::json([
                    "status" => "success",
                    "results" => $post
                ], 200);
            }else{
                return Response::json([
                    "status" => "failure",
                    "results" => []
                ], 400);
            }
        }
        else{
            return Response::json([
                "status" => "failure",
                "message" => "You are not logged in"
            ], 400);
        }
        
    }

    // public function getSpecifiedPosts() {
        
    // }
}
