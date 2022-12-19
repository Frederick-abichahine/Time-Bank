<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Response;
use Tymon\JWTAuth\Facades\JWT;

class AuthController extends Controller
{   
    /*
    #####################################
    Create a new AuthController instance.
    #####################################
    */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /*
    #########################################
    Login to get a JWT via given credentials.
    #########################################
    */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return Response::json($validator->errors()->toJson(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return Response::json(['error' => 'Unauthorized'], 401);
        }
        // now we are sure that the user exists and the password is correct
        $jwtt = $this->createNewToken($token); //get the token
        // $user = User::where('email', $request->email) //get the user
        // ->where('password', $request->password)
        // ->get();
        // $user->jwt_token = "hi"; //update the user with the new token in the database
        // $user->save();

        // add the jwt token to the database for the user as a string
        $user = User::where('email', $request->email) //get the user
        ->where('password', $request->password)
        ->update(['jwt_token' => $jwtt]);

        return $jwtt;
    }
    /*
    #################################################################################
    Register a User. Once registered, the user will need to login to get a JWT token.
    #################################################################################
     */

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return Response::json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)] //hashing the password
                    //add later: get location from google
                ));
        return Response::json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return Response::json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return Response::json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return Response::json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
