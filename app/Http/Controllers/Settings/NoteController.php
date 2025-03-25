<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class NoteController extends Controller
{
    /**
     * Show the user's notes settings page.
     */
    public function edit(Request $request): Response
    {
        return inertia('settings/notes', [
        ]);
    }

    /**
     * Update the user's note settings.
     */
    public function update(Request $request): RedirectResponse
    {
        return redirect()->route('settings.notes.edit');
    }
}
