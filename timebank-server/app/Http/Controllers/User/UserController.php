<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /*
    ####################
    Getting user details
    ####################
    */

    public function editProfile(Request $request){
        // Editing the user profile
        if (Auth::check()) { //to check if user is logged in
            $validator = Validator::make($request->all(), [ //validating the request, ensuring that the username and email are unique
                'username' => 'unique:users,username,'.Auth::user()->id,
                'email' => 'unique:users,email,'.Auth::user()->id,
            ]);
            if ($validator->fails()) {
                return Response::json($validator->errors()->toJson(), 422);
            }
            // Updating the user details
            $id = Auth::user()->id; //getting the user id of the logged in user
            $user = User::find($id);

            // Checking if the request has a value and if it does, updating the user details, else keeping the old value
            $user->username = $request->username ? $request->username : $user->username;
            $user->email = $request->email ? $request->email : $user->email;
            $user->profile_picture = $request->profile_picture ? $request->profile_picture : $user->profile_picture;
            $user->description = $request->description ? $request->description : $user->description;
            $user->location = $request->location ? $request->location : $user->location;

            // Ensuring a successful update
            if($user->save()){
                return Response::json([
                    "status" => "success",
                    "results" => $user
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
}
