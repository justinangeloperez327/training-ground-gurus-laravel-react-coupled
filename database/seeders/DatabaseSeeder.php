<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\JobListing;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(1)->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => 'password',
        //         'email_verified_at' => now(),
        //     ]
        // );

        // JobListing::factory(50)->create();

        // Company::factory(10)->create()->each(function ($company) {
        //     JobListing::factory(5)->create([
        //         'company_id' => $company->id,
        //     ]);
        // });

        // DB::table('users')->update([
        //     'two_factor_secret' => null,
        //     'two_factor_recovery_codes' => null,
        //     'two_factor_confirmed_at' => null,
        // ]);
    }
}
