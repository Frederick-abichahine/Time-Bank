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

    function signup(Request $request){
        // to check if the request is valid, whether the username, email and password are provided
        $validate = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        // if the request is not valid, meaning the username, email or password are not provided
        if($validate->fails()){
            return response()->json([
                "status" => "failed",
                "results" => []
            ]);
        }
        // if the request is valid, meaning the email and password are provided
        else{
            // getting any user with the same email
            $user = User::where('email', $request->email)->get();

            // if email already exists, hence new user needs to use a different email
            if($user != '[]'){
                return response()->json([
                    "status" => "email already exists",
                    "results" => []
                ]);
            }
            // if email does not exist, hence new user can use this email
            else {
                // creating new user
                $user = new User;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->password = $request->password;
                $user->jwt_token = ""; //to add later
                $user->location = ""; //to add later
                $user->profile_picture = ""; //to add later
                $user->description = ""; //to add later
                $user->user_type_id = 1; //by default all users are created as normal users
                $user->save();

                return response()->json([
                    "status" => "success",
                    "results" => $user
                ]);
            }
        }
    }
}
