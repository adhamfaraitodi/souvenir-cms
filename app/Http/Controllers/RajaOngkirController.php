<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RajaOngkirController extends Controller
{
    public function getShippingCost(Request $request)
    {
        $client = new Client();
        $url = 'https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost';
        $headers = [
            'accept' => 'application/json',
            'content-type' => 'application/x-www-form-urlencoded',
            'Key' => env('RAJA_ONGKIR_API_KEY'),
        ];
        $data = [
            'origin' => $request->input('origin'),
            'destination' => $request->input('destination'),
            'weight' => $request->input('weight'),
            'courier' => $request->input('courier'),
            'price' => $request->input('price'),
        ];

        try {
            $postResponse = $client->post($url, [
                'headers' => $headers,
                'body' => http_build_query($data),
            ]);
            $responseBody = json_decode($postResponse->getBody(), true);
            $shippingCost = $responseBody['data'][0]['cost'] ?? 0;

            return response()->json([
                'shippingCost' => $shippingCost
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An unexpected error occurred',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
