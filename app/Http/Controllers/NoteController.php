<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('notes/index', [
            'notes' => $this->fetchNotes($request),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Note $note)
    {
        if ($request->user()->id !== $note->user_id) {
            abort(Response::HTTP_FORBIDDEN);
        }

        return inertia('notes/show', [
            'note' => $note,
            'notes' => $this->fetchNotes($request),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $note = $request->user()->notes()->create([
            'name' => '',
            'content' => '',
        ]);

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
            if ($request->user()->id !== $note->user_id) {
                abort(Response::HTTP_FORBIDDEN);
            }

            $note->update(['order' => $update['order']]);
        }

        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        if ($request->user()->id !== $note->user_id) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $payload = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'content' => ['sometimes', 'required', 'string'],
        ]);

        $note->update($payload);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Note $note)
    {
        if ($request->user()->id !== $note->user_id) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $note->delete();

        return redirect()->route('notes.index');
    }

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
