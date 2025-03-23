<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('app/images/index', [
            'images' => $request->user()->images()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $imageFile = $request->file('image');

        $filename = str()->uuid().'.'.$imageFile->getClientOriginalExtension();
        $path = $imageFile->storeAs('images', $filename, 'public');

        $image = $request->user()->images()->create([
            'filename' => $filename,
            'path' => $path,
            'url' => Storage::url($path),
            'size' => $imageFile->getSize(),
            'mime_type' => $imageFile->getMimeType(),
        ]);

        return response()->json($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        Gate::allowIf(fn (User $user) => $user->id === $image->user_id);

        $image->delete();

        return redirect()->back();
    }
}
