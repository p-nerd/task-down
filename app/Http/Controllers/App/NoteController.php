<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $notesPagination = $this->notesQuery($request)->paginate(perPage: 16, page: $request->input('page', 1));

        $notes = $notesPagination->items();

        return inertia('app/notes/index', [
            'notes' => Inertia::merge(fn () => $notes),
            'page' => $notesPagination->currentPage(),
            'lastPage' => $notesPagination->lastPage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $note = $request->user()->notes()->create(['name' => '', 'content' => '']);

        return response()->json($note);
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
            'selected_note_id' => ['nullable', 'exists:notes,id'],
        ]);

        foreach ($payload['notes'] as $update) {
            $note = Note::find($update['id']);

            Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

            $note->update(['order' => $update['order']]);
        }

        return response()->json(['message' => 'fine']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

        $payload = collect($request->validate([
            'name' => ['sometimes', 'string', 'max:255', 'nullable'],
            'content' => ['sometimes', 'string', 'nullable'],
            'pin_at' => ['sometimes', 'date', 'nullable'],
            'archive_at' => ['sometimes', 'date', 'nullable'],
        ]));

        if ($payload->has('name')) {
            $note->name = $payload->get('name') ?? '';
        }

        if ($payload->has('content')) {
            $note->content = $payload->get('content') ?? '';
        }

        if ($payload->has('pin_at')) {
            $note->pin_at = $payload->get('pin_at') ?? null;
        }

        if ($payload->has('archive_at')) {
            $note->archive_at = $payload->get('archive_at') ?? null;
        }

        $note->save();

        return response()->json(['message' => 'fine']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

        $note->delete();

        return response()->json(['message' => 'fine']);
    }

    /**
     * Fetch all notes for the authenticated user.
     */
    private function notesQuery(Request $request)
    {
        return $request
            ->user()
            ->notes()
            ->where('archive_at', null)
            ->orderBy('order')
            ->orderBy('created_at', 'desc');
    }
}
