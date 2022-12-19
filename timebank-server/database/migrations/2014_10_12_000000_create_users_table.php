<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('jwt_token')->default(''); //when a user is created they will have an empty jwt token, it is updated as the user logs in, and destroyed when logged out
            $table->string('location')->default('Add Location'); //to be fixed later, take location from google when a user registers
            $table->string('profile_picture')->default('../assets/time_icon.png'); //displays a 'default user image', to be updated later
            $table->string('description')->default('Add Description'); //empty till the user edits their profile
            $table->integer('user_type_id')->default('1'); //to set all new users by default as normal users
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
