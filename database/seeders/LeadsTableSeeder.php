<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class LeadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Path to the CSV file
        $csvPath = __DIR__ . '/data/leads.csv';

        // Open the CSV file
        $csv = Reader::createFromPath($csvPath, 'r');
        $csv->setHeaderOffset(0); // The first row is the header

        $chunkSize = 500; // Number of records to accumulate before a batch insert
        $total = 0;       // Counter for total inserted records
        $dataChunk = [];  // Array to accumulate the chunk of data

        // Iterate through the CSV records one by one
        foreach ($csv->getRecords() as $record) {
            $dataChunk[] = [
                'id' => $record['id'],
                'name' => $record['name'],
                'email' => $record['email'],
                'phone' => $record['phone'],
                'lead_status_id' => $record['lead_status_id'],
                'created_at' => $record['created_at'],
                'updated_at' => $record['updated_at'],
            ];

            // When the chunk size is reached, insert the chunk and reset
            if (count($dataChunk) === $chunkSize) {
                DB::table('leads')->insert($dataChunk);
                $total += count($dataChunk);
                $this->command->info("Inserted $total records");

                $dataChunk = []; // Reset the chunk
            }
        }

        // Insert any remaining records after the last chunk
        if (!empty($dataChunk)) {
            DB::table('leads')->insert($dataChunk);
            $total += count($dataChunk);
            $this->command->info("Inserted remaining $total records");
        }
    }
}
