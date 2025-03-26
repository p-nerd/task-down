<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class NoteController extends Controller
{
    /**
     * Show the user's notes settings page.
     */
    public function edit(): Response
    {
        return inertia('settings/notes');
    }

    /**
     * Update the notes settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'notes_initial_sidebar_visibility' => ['required', 'boolean'],
        ]);

        $request->user()->setNotesInitialSidebarVisibility($validated['notes_initial_sidebar_visibility']);

        return redirect()->back()->with('success', 'Notes settings updated successfully.');
    }
}
