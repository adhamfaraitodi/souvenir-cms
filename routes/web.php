<?php

use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\RajaOngkirController;
use App\Http\Controllers\User\PaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\User\OrderController as UserOrderController;
use App\Http\Controllers\User\ControlController as UserControlController;
use App\Http\Controllers\User\LandingPageController as UserLandingPageController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\AdminManageController as AdminManageController;
use App\Http\Controllers\Admin\LandingPageController as AdminLandingPageController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\UserManageController as AdminUserManageController;
//login
Route::middleware('guest')->group(function () {
    Route::get('login', [UserAuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [UserAuthController::class, 'login']);
    Route::post('logout', [UserAuthController::class, 'logout'])->name('logout');
    Route::get('admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('admin/login', [AdminAuthController::class, 'login']);
});

Route::post('admin/logout', [AdminAuthController::class, 'globalLogout'])->name('admin.logout');
// User routes
Route::name('user.')->middleware('is_user')->group(function () {
    Route::get('/', [UserDashboardController::class, 'Index'])->name('home');
    Route::get('/orders/list',[UserOrderController::class,'index'])->name('orders.list');
    Route::get('/orders/detail/{id}',[UserOrderController::class,'show'])->name('orders.detail');
    Route::get('/orders/create/{id}',[UserOrderController::class,'create'])->name('orders.new');
    Route::get('/orders/{id}',[UserOrderController::class,'edit'])->name('orders.edit');
    Route::get('/payment',[PaymentController::class,'show'])->name('payment.show');
    Route::resource('controls', UserControlController::class);
    Route::resource('landing-page', UserLandingPageController::class);
    Route::resource('products', UserProductController::class);
});
//Admin routes
Route::prefix('admin')->name('admin.')->middleware('is_admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'Index'])->name('home');
    Route::resource('orders', AdminOrderController::class);
    Route::resource('manages', AdminManageController::class);
    Route::resource('landing-page', AdminLandingPageController::class);
    Route::resource('products', AdminProductController::class);
    Route::resource('users', AdminUserManageController::class);
});
