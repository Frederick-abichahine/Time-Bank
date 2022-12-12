<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    
    protected $table = 'posts';
    protected $fillable = [
        'skill_to_offer',
        'skill_to_learn',
        'offer_time',
        'description',
        'user_id',
    ];
}
