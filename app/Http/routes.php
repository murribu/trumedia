<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

/* Players */
Route::get('/players', 'PlayerController@getPlayers');
Route::get('/players/pitchers', 'PlayerController@getPitchers');
Route::get('/players/batters', 'PlayerController@getBatters');
Route::get('/players/arbitrary/{count}', 'PlayerController@getArbitraryPlayers');
Route::get('/player/{id}', 'PlayerController@getPlayer');
Route::get('/player/{id}/catcherframing', 'PlayerController@getPlayerCatcherFramingByMonth');
Route::get('/player/{id}/velocitydiff', 'PlayerController@getPlayerVelocityDifferenceByMonth');
Route::get('/player/{id}/battedballdistance', 'PlayerController@getPlayerBattedBallDistanceByMonth');

/* Reports */
Route::post('/report/catcherframing', 'ReportController@postCatcherFramingReport');
Route::post('/report/velocitydiff', 'ReportController@postVelocityDiffReport');
Route::post('/report/pitches', 'ReportController@postPitches');

Route::get('/pitchtypes', 'ReportController@getPitchTypes');
Route::get('/pitchresults', 'ReportController@getPitchResults');
Route::get('/plateappearanceresults', 'ReportController@getPlateAppearanceResults');
