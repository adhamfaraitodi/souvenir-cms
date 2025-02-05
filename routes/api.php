<?php

use App\Http\Controllers\Api\MidtransController;
use App\Http\Controllers\Api\RajaOngkirController;
use App\Http\Controllers\User\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/check-ongkir',[RajaOngkirController::class,'getShippingCost'])->name('check.ongkir');
Route::post('/create-payment', [PaymentController::class, 'createPayment'])->name('create.payment');
Route::post('/webhook-midtrans', [MidtransController::class, 'getWebhook'])->name('get.webhook');

