<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class ImageController extends Controller
{
    /**
     * Show the user's images settings page.
     */
    public function edit(): Response
    {
        return inertia('settings/images');
    }

    /**
     * Update the notes settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'images_initial_view_mode' => ['required', 'string'],
        ]);

        $request->user()->setImagesInitialViewMode($validated['images_initial_view_mode']);

        return redirect()->back()->with('success', 'Images settings updated successfully.');
    }
}
