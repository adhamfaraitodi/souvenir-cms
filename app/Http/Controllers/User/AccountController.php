<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\City;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index() {
        $provinces = Province::select('id', 'province_name')->get();
        $cities = City::select('id', 'province_id', 'city_name')->get();
        $data = User::with('addresses.city.province')
            ->where('id', Auth::user()->id)
            ->first();

        $addresses = $data && $data->addresses->isNotEmpty()
            ? $data->addresses->map(function ($address) {
                return [
                    'id' => $address->id,
                    'street_address' => $address->street_address,
                    'postal_code' => $address->postal_code,
                    'city_id' => $address->city_id,
                    'city_name' => optional($address->city)->city_name,
                    'province_name' => optional($address->city->province)->province_name,
                ];
            }) : [];

        return Inertia::render('User/Account/Profile', [
            'user' => collect($data)->only(['id', 'name', 'email', 'phone']),
            'addresses' => $addresses,
            'provinces' => $provinces,
            'cities' => $cities,
        ]);
    }

    public function create(Request $request) {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'city_id' => 'required|exists:cities,id',
            'postal_code' => 'required|string|max:5',
            'street_address' => 'required|string'
        ]);
        try {
            Address::create([
                'user_id' => Auth::user()->id,
                'city_id' => $request->city_id,
                'postal_code' => $request->postal_code,
                'street_address' => $request->street_address,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            return response()->json(['success' => true, 'message' => 'Address saved successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save address',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function edit($id)
    {
        try {
            $address = Address::where('id', $id)
                ->where('user_id', Auth::user()->id)
                ->firstOrFail();
            $cities = City::select('id', 'province_id', 'city_name')->get();
            $provinces = Province::select('id', 'province_name')->get();

            return Inertia::render('User/Account/AddressEdit', [
                'address' => $address,
                'cities' => $cities,
                'provinces' => $provinces
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Address not found');
        }
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'city_id' => 'required|exists:cities,id',
            'postal_code' => 'required|string|max:5',
            'street_address' => 'required|string'
        ]);
        try {
            $address = Address::where('id', $id)
                ->where('user_id', Auth::user()->id)
                ->firstOrFail();
            $address->update([
                'city_id' => $request->city_id,
                'postal_code' => $request->postal_code,
                'street_address' => $request->street_address
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Address updated successfully'
            ], 200);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update address',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
