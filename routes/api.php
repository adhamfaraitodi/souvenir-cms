<?php

use App\Http\Controllers\Api\RajaOngkirController;
use Illuminate\Support\Facades\Route;

Route::post('/check-ongkir',[RajaOngkirController::class,'getShippingCost'])->name('check.ongkir');

