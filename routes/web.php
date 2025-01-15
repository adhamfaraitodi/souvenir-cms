<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\User\OrderController as UserOrderController;
use App\Http\Controllers\User\ControlController as UserControlController;
use App\Http\Controllers\User\LandingPageController as UserLandingPageController;
use App\Http\Controllers\User\PaymentController as UserPaymentController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\AdminManageController as AdminManageController;
use App\Http\Controllers\Admin\LandingPageController as AdminLandingPageController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\UserManageController as AdminUserManageController;

Route::get('/', function () {return Inertia::render('User/index');})->name('home');
// User routes
Route::name('user.')->group(function () {
    Route::resource('orders', UserOrderController::class);
    Route::resource('controls', UserControlController::class);
    Route::resource('landing', UserLandingPageController::class);
    Route::resource('payments', UserPaymentController::class);
    Route::resource('products', UserProductController::class);
});

// Admin routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('orders', AdminOrderController::class);
    Route::resource('manages', AdminManageController::class);
    Route::resource('landing', AdminLandingPageController::class);
    Route::resource('products', AdminProductController::class);
    Route::resource('users', AdminUserManageController::class);
});

