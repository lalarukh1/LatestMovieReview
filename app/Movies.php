<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class Movies extends Model
{
    use Searchable;
    //protected $guarded = [];



    public function movies()
    {
        return $this->belongsTo('App\Movies');

    }

}
