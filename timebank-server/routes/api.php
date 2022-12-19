<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\PostController;

Route::group(['prefix' => 'v0.1'], function () {
    Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('user-profile', [AuthController::class, 'userProfile']); 
    });
    Route::get('count-posts/{id?}', [PostController::class, 'countPosts']);
});
