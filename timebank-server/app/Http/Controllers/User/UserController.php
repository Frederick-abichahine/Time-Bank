<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    function login(Request $request){
        // return response()->json(["message" => "Hello World"]);
        dd("Hello World");
    }
}
