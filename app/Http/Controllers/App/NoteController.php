<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('app/notes/index', [
            'notes' => $this->fetchNotes($request),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $note = $request
            ->user()
            ->notes()
            ->create(['name' => '', 'content' => '']);

        return redirect()->route('notes.show', $note);
    }

    /**
     * Update the order of multiple notes.
     */
    public function reorder(Request $request)
    {
        $payload = $request->validate([
            'notes' => ['required', 'array'],
            'notes.*.id' => ['required', 'string', 'exists:notes,id'],
            'notes.*.order' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($payload['notes'] as $update) {
            $note = Note::find($update['id']);
            Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

            $note->update(['order' => $update['order']]);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

        $payload = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'content' => ['sometimes', 'string'],
        ]);

        $note->update($payload);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

        $note->delete();

        $validated = $request->validate(['show' => ['boolean', 'nullable']]);
        if ($validated['show'] ?? false) {
            $notes = $this->fetchNotes($request);
            if ($notes->count() > 0) {
                return redirect()->route('notes.show', $notes[0]);
            }
        }

        return redirect()->route('notes.index');
    }

    /**
     * Fetch all notes for the authenticated user.
     */
    private function fetchNotes(Request $request)
    {
        return $request
            ->user()
            ->notes()
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
