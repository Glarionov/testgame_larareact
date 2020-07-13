<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    function indexAction() {
        $flights = Questions::all();

        foreach ($flights as $flight) {
            echo $flight->name;
        }
    }
}
