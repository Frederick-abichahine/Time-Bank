<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;

class PostController extends Controller
{
    /*
    ###################################
    Count number of posts for this user
    ###################################
    */

    public function countPosts($id = 0) {
        // Counts the number of posts for this user
        // $user = Response::json(auth()->user());
        // $user_id = $user->id;
        $count = Post::where('user_id', $id)->count();
        return $count;
    }
}
