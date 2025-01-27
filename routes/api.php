<?php

use App\Http\Controllers\RajaOngkirController;
use Illuminate\Support\Facades\Route;

Route::post('/check-ongkir',[RajaOngkirController::class,'getShippingCost'])->name('check.ongkir');

