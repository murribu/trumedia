<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBallStrikeToPitchResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pitch_results', function($table) {
            $table->boolean('ball');
            $table->boolean('strike');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pitch_results', function($table) {
            $table->dropColumn('ball');
            $table->dropColumn('strike');
        });
    }
}
