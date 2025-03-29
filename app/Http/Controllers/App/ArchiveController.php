<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $notesPagination = $this->notesQuery($request)->paginate(perPage: 16, page: $request->input('page', 1));

        $notes = $notesPagination->items();

        return inertia('app/archive/index', [
            'notes' => Inertia::merge(fn () => $notes),
            'page' => $notesPagination->currentPage(),
            'lastPage' => $notesPagination->lastPage(),
        ]);
    }

    /**
     * Fetch all notes for the authenticated user.
     */
    private function notesQuery(Request $request)
    {
        return $request
            ->user()
            ->notes()
            ->where('archive_at', '!=', null)
            ->orderBy('order')
            ->orderBy('created_at', 'desc');
    }
}
