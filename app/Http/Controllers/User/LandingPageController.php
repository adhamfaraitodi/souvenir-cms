<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        $userId=Auth::user()->id;
        $themes= Theme::all();
        $landingPages = LandingPage::whereHas('order', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->with(['theme:id,title,html_code,css_code'])
            ->get(['id', 'theme_id','title', 'landing_page_code','url', 'html_code', 'css_code']);

        return Inertia::render('User/LandingPage/Index', ['landingPages' => $landingPages,'themes'=>$themes]);
    }
    public function edit(string $id)
    {
        $userId = Auth::user()->id;
        $landingPage = Landingpage::whereHas('order',function ($query) use($userId){
            $query->where('user_id', $userId);
        })
            ->where('landing_page_code', $id)
            ->first();
        if (!$landingPage) {
            abort(404, 'Landing page not found or you do not have permission to edit it.');
        }
        return Inertia::render('User/LandingPage/Id/Index', [
            'html_code' => $landingPage->html_code,
            'css_code' => $landingPage->css_code,
        ]);
    }
    public function update(Request $request,string $id)
    {
        $landingPage = LandingPage::findOrFail($id);

        $validated = $request->validate([
            'html_code' => 'required|string',
            'css_code' => 'required|string',
        ]);

        $landingPage->update($validated);

        return redirect()->route('user.landing.page.index');
    }
    public function projectEdit(string $id)
    {
        $landingPage = LandingPage::with('theme')
            ->where('landing_page_code', $id)
            ->firstOrFail();
        $themes = Theme::select('id', 'title','html_code','css_code')
            ->get();
        return Inertia::render('User/LandingPage/Id/Edit', [
            'landingPage' => [
                'id' => $landingPage->id,
                'title' => $landingPage->title,
                'theme_id' => $landingPage->theme_id,
                'theme' => [
                    'id' => $landingPage->theme->id,
                    'title' => $landingPage->theme->title,
                    'html_code' => $landingPage->theme->html_code,
                    'css_code' => $landingPage->theme->css_code,
                ],
            ],
            'themes' => $themes->map(function ($theme) {
                return [
                    'id' => $theme->id,
                    'title' => $theme->title,
                    'html_code' => $theme->html_code,
                    'css_code' => $theme->css_code,
                ];
            }),
        ]);
    }
    public function projectUpdate(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'theme_id' => 'required|exists:themes,id',
        ]);
        $landingPage = LandingPage::findOrFail($id);
        $theme = Theme::findOrFail($validated['theme_id']);
        $landingPage->update([
            'title' => $validated['title'],
            'theme_id' => $validated['theme_id'],
            'html_code' => $theme->html_code,
            'css_code' => $theme->css_code,
        ]);
        return redirect()->route('user.landing.page.index')
            ->with('success', 'Landing page updated successfully');
    }

    public function share(string $id)
    {
        $landingPage = LandingPage::where('landing_page_code', $id)
            ->select('url')
            ->firstOrFail();
        return Inertia::render('User/LandingPage/Id/Share', [
            'url' => $landingPage->url,
        ]);
    }
    public function show(string $id)
    {
        $landingPage = LandingPage::where('landing_page_code', $id)
            ->select('title', 'html_code', 'css_code')
            ->firstOrFail();
        return Inertia::render('User/LandingPage/Id/Preview', [
            'title' => $landingPage->title,
            'html_code' => $landingPage->html_code,
            'css_code' => $landingPage->css_code,
        ]);
    }
    public function shareProject(string $id)
    {
        $landingPage = LandingPage::where('url', $id)
            ->select('html_code', 'css_code')
            ->firstOrFail();
        return Inertia::render('User/LandingPage/Id/Shared', [
            'html_code' => $landingPage->html_code,
            'css_code' => $landingPage->css_code,
        ]);
    }
}
