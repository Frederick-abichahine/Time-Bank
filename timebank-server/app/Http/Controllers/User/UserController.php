<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /*
    ####################
    Getting user details
    ####################
    */

    public function getUserDetails($id = 0) {
        // Returns all the details for this user
        $user = User::where('id', $id)->get();
        return $user;
    }
}
