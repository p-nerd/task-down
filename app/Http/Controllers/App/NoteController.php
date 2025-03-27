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
        $note = Note::find($request->session()->get('notes.selected_note_id') ?? $request->input('noteId'));

        return inertia('app/notes', [
            'notes' => Inertia::merge(fn () => $notes),
            'page' => $notesPagination->currentPage(),
            'lastPage' => $notesPagination->lastPage(),
            'note' => $note ?? null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $note = $request->user()->notes()->create(['name' => '', 'content' => '']);

        $request->session()->flash('notes.selected_note_id', $note->id); // @phpstan-ignore-line

        return redirect()->back();
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

        if (collect($payload)->has('selected_note_id')) {
            $request->session()->flash('notes.selected_note_id', $payload['selected_note_id']);
        }

        return redirect()->back();
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
        ]));

        if ($payload->has('name')) {
            $note->name = $payload->get('name') ?? '';
        }

        if ($payload->has('content')) {
            $note->content = $payload->get('content') ?? '';
        }

        $note->save();

        $request->session()->flash('notes.selected_note_id', $note->id);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Note $note)
    {
        Gate::allowIf(fn (User $user) => $user->id === $note->user_id);

        $notes = $this
            ->notesQuery($request)
            ->get();

        $nextNote = collect($notes)->after($note);
        if ($nextNote) {
            $request->session()->flash('notes.selected_note_id', $nextNote->id);
        } else {
            $beforeNote = collect($notes)->before($note);
            if ($beforeNote) {
                $request->session()->flash('notes.selected_note_id', $beforeNote->id);
            }
        }

        $note->delete();

        return redirect()->back();
    }

    /**
     * Fetch all notes for the authenticated user.
     */
    private function notesQuery(Request $request)
    {
        return $request
            ->user()
            ->notes()
            ->orderBy('order')
            ->orderBy('created_at', 'desc');
    }
}
