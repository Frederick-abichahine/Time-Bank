<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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

Route::post("login", [UserController::class, "login"]);