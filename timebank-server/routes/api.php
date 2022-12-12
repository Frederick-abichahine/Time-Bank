<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\PostController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(["prefix" => "v0.1"], function(){
//     Route::group(["middleware" => "admin.auth"], function(){
//         // These routes are only accessible by admins
//         Route::group(["prefix" => "user"], function(){
            
//         });
//     });

//     Route::group(["prefix" => "user"], function(){
        
//     });
// });

Route::get("login", [UserController::class, "login"]);
Route::post("login2", [UserController::class, "login2"]);