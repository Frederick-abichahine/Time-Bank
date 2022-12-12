<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function login(Request $request){
        return response()->json([
            'message' => 'Login successful Post',
            'data' => $request->all()
        ]);
    }
    function login2(Request $request){
        return response()->json([
            'message' => 'Login successful Get',
            'data' => $request->all()
        ]);
    }
}
