<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class UserController extends Controller
{
    function login(Request $request){

        // to check if the request is valid, whether the email and password are provided
        $validate = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        // if the request is not valid, meaning the email or password are not provided
        if($validate->fails()){
            return response()->json([
                "status" => "failed",
                "results" => []
            ]);
        } 
        // if the request is valid, meaning the email and password are provided
        else{
            // to find if user exists
            $user = User::where('email', $request->email)
            ->where('password', $request->password)
            ->get();
            // if user does not exist
            if($user == '[]'){
                return response()->json([
                    "status" => "user not found",
                    "results" => []
                ]);
            }
            // if user exists
            else {
                return response()->json([
                    "status" => "success",
                    "results" => $user
                ]);
            }
        }
    }
}
