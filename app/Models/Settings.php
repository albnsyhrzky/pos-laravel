<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    //
    // elequent: object relaction mapping
    // query builder:
    protected $fillable =
    [
        'app_name',
        'phone_number',
        'address'

    ];
}
