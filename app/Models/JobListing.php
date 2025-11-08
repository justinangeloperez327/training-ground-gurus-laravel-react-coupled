<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    /** @use HasFactory<\Database\Factories\JobListingFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'location',
        'min_salary',
        'max_salary',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
