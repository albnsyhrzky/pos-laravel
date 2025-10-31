<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    protected $fillable =
    [
        'order_id',
        'product_id',
        'qty',
        'order_price',
        'order_subtotal'
    ];
}
