<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeParentIdToGroupDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('group_data', function (Blueprint $table) {
            $table->dropColumn('parent_id');
        });

        Schema::table('group_data', function (Blueprint $table) {
                $table->integer('parent_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('group_data', function (Blueprint $table) {
            //
        });
    }
}
