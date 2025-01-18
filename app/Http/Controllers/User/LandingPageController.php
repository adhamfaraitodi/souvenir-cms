<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        $landingpage = LandingPage::all();
        return Inertia::render('User/LandingPage/Index', ['landingpage' => $landingpage]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $landingpage = LandingPage::find($id);
        if (!$landingpage) {
            return redirect()->route('user.landing-page.index')->with('error', 'landing page not found.');
        }
        return Inertia::render('User/LandingPage/Id/Index', ['landingpage' => $landingpage]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
