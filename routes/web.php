<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check())
        return File::get(public_path() . '/dashboard/index.html');
    return view('auth.login');
});

Auth::routes();

Route::get('logout', function (){
    Auth::logout();
    return redirect('/');
});

Route::fallback(function () {
    return redirect('/');
});
