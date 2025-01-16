<?php

use App\Http\Controllers\Auth\UserAuthController;
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

// User Auth
Route::get('login', [UserAuthController::class, 'showLoginForm'])->name('login');
Route::post('login', [UserAuthController::class, 'login']);
Route::post('logout', [UserAuthController::class, 'logout'])->name('logout');

// User routes
Route::get('/', function () {return Inertia::render('User/index');})->name('home');
Route::name('user.')->group(function () {
    Route::resource('orders', UserOrderController::class);
    Route::resource('controls', UserControlController::class);
    Route::resource('landing', UserLandingPageController::class);
    Route::resource('payments', UserPaymentController::class);
    Route::resource('products', UserProductController::class);
});

// Admin routes
Route::get('/admin', function () {return Inertia::render('Admin/Index');})->name('home');
Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('orders', AdminOrderController::class);
    Route::resource('manages', AdminManageController::class);
    Route::resource('landing', AdminLandingPageController::class);
    Route::resource('products', AdminProductController::class);
    Route::resource('users', AdminUserManageController::class);
});

