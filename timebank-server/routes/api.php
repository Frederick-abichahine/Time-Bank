<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\UserController;

// Grouping all routes related to version 0.1
Route::group(['prefix' => 'v0.1'], function () {

    // Grouping all routes that require authentication & authorization
    Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('user-profile', [AuthController::class, 'userProfile']); 
    });
    
    // Grouping all routes related to posts
    Route::group(['prefix' => 'posts'], function () {
        Route::get('count-posts', [PostController::class, 'countPosts']);
        Route::get('get-all-posts', [PostController::class, 'getAllPosts']);
        Route::post('create-post', [PostController::class, 'createPost']);
    });

    // Grouping all routes related to users
    Route::group(['prefix' => 'users'], function () {
        Route::post('edit-profile', [UserController::class, 'editProfile']);
    });
});
