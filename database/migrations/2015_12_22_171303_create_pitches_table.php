<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePitchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function(Blueprint $table){
            $table->increments('id');
            $table->integer('mlb_id')->unsigned()->unique();
            $table->string('name');
            $table->string('batter_hand',1)->index();
            $table->string('pitcher_hand',1)->index();
            $table->integer('timestamp_utc')->unsigned();
        });
        Schema::create('pitch_results', function(Blueprint $table){
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('description');
            $table->integer('timestamp_utc')->unsigned();
        });
        Schema::create('pitch_types', function(Blueprint $table){
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('description');
            $table->integer('timestamp_utc')->unsigned();
        });
        Schema::create('plate_appearance_results', function(Blueprint $table){
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('description');
            $table->integer('timestamp_utc')->unsigned();
        });
        Schema::create('batted_ball_types', function(Blueprint $table){
            $table->increments('id');
            $table->string('slug')->unique();
            $table->string('description');
            $table->integer('timestamp_utc')->unsigned();
        });
        Schema::create('pitches', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('raw_data_id')->unsigned();
            $table->foreign('raw_data_id')->references('id')->on('raw_data');
            $table->integer('season_year')->index();
            $table->string('game_string')->index();
            $table->datetime('game_date')->index();
            $table->string('game_type')->index();
            $table->string('visitor',10)->index();
            $table->string('home',10)->index();
            $table->integer('visiting_team_final_runs');
            $table->integer('home_team_final_runs');
            $table->integer('inning')->index();
            $table->string('side',1)->index();
            $table->integer('batter_id')->unsigned();
            $table->foreign('batter_id')->references('id')->on('players');
            $table->integer('pitcher_id')->unsigned();
            $table->foreign('pitcher_id')->references('id')->on('players');
            $table->integer('catcher_id')->unsigned();
            $table->foreign('catcher_id')->references('id')->on('players');
            $table->integer('times_faced');
            $table->string('batter_pos');
            $table->smallInteger('balls');
            $table->smallInteger('strikes');
            $table->smallInteger('outs');
            $table->boolean('man_on_first');
            $table->boolean('man_on_second');
            $table->boolean('man_on_third');
            $table->boolean('end_man_on_first');
            $table->boolean('end_man_on_second');
            $table->boolean('end_man_on_third');
            $table->integer('visiting_team_current_runs');
            $table->integer('home_team_current_runs');
            $table->integer('pitch_result_id')->unsigned();
            $table->foreign('pitch_result_id')->references('id')->on('pitch_results');
            $table->integer('pitch_type_id')->unsigned();
            $table->foreign('pitch_type_id')->references('id')->on('pitch_types');
            $table->decimal('release_velocity',5,2);
            $table->decimal('spin_rate',7,3);
            $table->decimal('spin_direction',7,4);
            $table->decimal('px',6,4);
            $table->decimal('pz',6,4);
            $table->decimal('szt',6,4);
            $table->decimal('szb',6,4);
            $table->decimal('x0',6,4);
            $table->integer('y0');
            $table->decimal('z0',6,4);
            $table->decimal('vx0',6,4);
            $table->decimal('vy0',7,4);
            $table->decimal('vz0',6,4);
            $table->decimal('ax',6,4);
            $table->decimal('ay',6,4);
            $table->decimal('az',6,4);
            $table->integer('pa_result_id')->unsigned();
            $table->foreign('pa_result_id')->references('id')->on('plate_appearance_results');
            $table->integer('runs_home')->nullable();
            $table->integer('batted_ball_type_id')->unsigned();
            $table->foreign('batted_ball_type_id')->references('id')->on('batted_ball_types');
            $table->decimal('batted_ball_angle',5,3);
            $table->decimal('batted_ball_distance',6,3);
            $table->string('atbat_desc');
            $table->integer('timestamp_utc')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pitches');
        Schema::drop('batted_ball_types');
        Schema::drop('plate_appearance_results');
        Schema::drop('pitch_types');
        Schema::drop('pitch_results');
        Schema::drop('players');
    }
}
