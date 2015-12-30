<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOutcomeColumnsToPlateAppearanceResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plate_appearance_results', function($table) {
            $table->boolean('atbat');
            $table->boolean('hit');
            $table->boolean('onbase');
            $table->smallInteger('bases');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plate_appearance_results', function($table) {
            $table->dropColumn('atbat');
            $table->dropColumn('hit');
            $table->dropColumn('onbase');
            $table->dropColumn('bases');
        });
    }
}
