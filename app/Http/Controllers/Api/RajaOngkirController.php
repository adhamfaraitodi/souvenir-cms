<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class RajaOngkirController extends Controller
{
    protected $client;
    protected $apiUrl;
    protected $headers;
    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 30,
        ]);
        $this->apiUrl = config('services.rajaongkir.url');
        $this->headers = [
            'accept' => 'application/json',
            'content-type' => 'application/x-www-form-urlencoded',
            'Key' => config('services.rajaongkir.key'),
        ];
    }
    public function getShippingCost(Request $request)
    {
        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'weight' => 'required|numeric|min:1',
            'courier' => 'required|string',
        ]);
        $validated['price'] = 'lowest';
        $cacheKey = 'shipping_cost:' . md5(serialize($validated));

        try {
            if (Cache::has($cacheKey)) {
                return response()->json([
                    'shippingCost' => Cache::get($cacheKey),
                    'cache' => true,
                ]);
            }
            $response = $this->client->post($this->apiUrl, [
                'headers' => $this->headers,
                'form_params' => $validated,
            ]);
            $responseBody = json_decode($response->getBody(), true);
            $shippingCost = data_get($responseBody, 'data.0.cost', 0);
            Cache::put($cacheKey, $shippingCost, now()->addHours(1));
    
            return response()->json([
                'shippingCost' => $shippingCost,
                'cache' => false,
            ]);
    
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            Log::error('RajaOngkir API Error', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'request' => $validated,
            ]);
            return response()->json([
                'error' => 'Failed to retrieve shipping cost. Please try again later.',
                'shippingCost' => 0,
            ], 500);
        }
    }
}
