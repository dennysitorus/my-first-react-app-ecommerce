<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/product', [ProductController::class, 'addProduct']);

Route::get('/product', [ProductController::class, 'getProducts']);
Route::get('/product/{id}', [ProductController::class, 'getProductDetail']);
Route::delete('/product/{id}', [ProductController::class, 'deleteProduct']);
Route::put('/product/update/{id}', [ProductController::class, 'updateProduct']);
Route::get('/product/search/{key}', [ProductController::class, 'searchProducts']);
