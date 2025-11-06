<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetail extends Model
{
    protected $fillable = [
        'user_id',
        'company',
        'job',
        'about',
        'phone',
        'photo',
        'address'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class, 'user_id', 'id');
    }
}
