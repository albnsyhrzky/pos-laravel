<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // query builder
        // elequent
        // ::
        Settings::create([
            'app_name' => 'Point of Sales | PPKD JP',
            'address' => 'JL Karet Baru',
            'phone_number' => '083147317899'
        ]);

        // DB::table('settings')->create([]);
    }
}
