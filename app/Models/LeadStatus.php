<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadStatus extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Define the relationship between LeadStatus and Lead.
     * Each lead status can have many leads.
     */
    public function leads()
    {
        return $this->hasMany(Lead::class, 'lead_status_id');
    }
}
