<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\PostController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v0.1'], function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('signup', [UserController::class, 'signup']);
    Route::get('getAllPosts', [PostController::class, 'getAllPosts']); //to display all posts on index page
    Route::get('getMyPosts', [PostController::class, 'getMyPosts']); //to display all my posts on my profile page
    Route::get('getSpecificPosts', [PostController::class, 'getSpecificPosts']); //to display specific posts based on search on index page (search by skil to learn)
});