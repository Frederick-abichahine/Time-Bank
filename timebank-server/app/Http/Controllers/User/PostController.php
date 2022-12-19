<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
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

    // public function getSpecifiedPosts() {
        
    // }
}
