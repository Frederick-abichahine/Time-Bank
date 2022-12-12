<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    function login(Request $request){

        $validate = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validate->fails()){
            return response()->json([
                "status" => "failed",
                "results" => []
            ]);
        } else{
            //find if user exists
            $user = User::where('email', $request->email)
                       -> where('password', $request->password)
                       -> get();

            if(!$user){
                return response()->json([
                    "status" => "user not found",
                    "results" => []
                ]);
            }else {
                return response()->json([
                    "status" => "success",
                    "results" => $user
                ]);
            }

        }
        // return response()->json([
        //     'message' => 'Login successful Post',
        //     'data' => $request->all()
        // ]);
    }
}
