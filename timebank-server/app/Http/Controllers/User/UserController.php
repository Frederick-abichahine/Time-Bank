<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Response;



class UserController extends Controller
{
    function login(){
        return Response::json(["message" => "Hello World Get"]);
    }
    function login2(){ //Request $request
        return Response::json(["message" => "Hello World Post"]);
    }
}
