<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('test', function () {
    return ['a' => 'b'];
});

//Route::get('/get-question/{id}', 'QuestionController@get');
Route::post('/get-question/{id}', 'QuestionController@get');
Route::post('/get-question-group/{id}', 'QuestionController@getQuestionsByGroupId');
//Route::post('/add-question-to-group/{id}', 'QuestionController@getQuestionsByGroupId');
Route::post('/add-question-to-group/{id}', 'QuestionController@addQuestionToGroup');
Route::post('/delete-question-everywhere/{id}', 'QuestionController@deleteQuestionEverywhere');
Route::post('/change-question-good-answer', 'QuestionController@changeQuestionGoodAnswer');
Route::post('/delete-option-from-question', 'QuestionController@deleteOptionFromQuestion');
Route::post('/get-question-group-list', 'GroupDataController@getAllTree');
Route::post('/add-group', 'GroupDataController@addGroup');
Route::post('/change-group-name', 'GroupDataController@changeGroupName');
Route::post('/delete-group', 'GroupDataController@deleteGroup');
Route::post('/change-option-name', 'QuestionController@changeOptionName');
Route::post('/change-question-name', 'QuestionController@changeQuestionName');
Route::post('/add-option-to-question', 'QuestionController@addOptionToQuestion');
Route::post('/change-text-by-id', 'TextByLanguageController@changeTextById');

Route::post('register', 'AuthController@register');
Route::post('register-with-mail', 'AuthController@registerWithMail');
Route::post('login', 'AuthController@login');
Route::get('logout', 'AuthController@logout');
Route::get('user', 'AuthController@getAuthUser');

Route::get('user/verify/{verification_code}', 'AuthController@verifyUser');
