<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeadStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Array of lead statuses data
        $statuses = [
            [
                'id' => 1,
                'name' => 'New Lead',
                'created_at' => '2024-10-11 13:06:36',
                'updated_at' => '2024-10-11 13:06:36',
            ],
            [
                'id' => 2,
                'name' => 'Appointment Set',
                'created_at' => '2024-10-11 13:06:36',
                'updated_at' => '2024-10-11 13:06:36',
            ],
            [
                'id' => 3,
                'name' => 'Deal lost',
                'created_at' => '2024-10-11 13:06:36',
                'updated_at' => '2024-10-11 13:06:36',
            ],
            [
                'id' => 4,
                'name' => 'Deal won',
                'created_at' => '2024-10-11 13:06:36',
                'updated_at' => '2024-10-11 13:06:36',
            ],
            [
                'id' => 5,
                'name' => 'Sold',
                'created_at' => '2024-10-11 13:06:36',
                'updated_at' => '2024-10-11 13:06:36',
            ],
        ];

        // Insert lead statuses into the database
        DB::table('lead_statuses')->insert($statuses);
    }
}
