<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $imagesPagination = $request
            ->user()
            ->images()
            ->paginate(perPage: 10, page: $request->input('page', 1));

        $images = $imagesPagination->items();

        return inertia('app/images/index', [
            'images' => Inertia::merge(fn () => $images),
            'page' => $imagesPagination->currentPage(),
            'last_page' => $imagesPagination->lastPage(),
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

        Storage::disk('public')->delete($image->path);

        $image->delete();

        return redirect()->back();
    }

    /**
     * Remove multiple resources from storage.
     */
    public function destroys(Request $request)
    {
        $payload = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['exists:images,id'],
        ]);

        $images = Image::query()
            ->whereIn('id', $payload['ids'])
            ->where('user_id', $request->user()->id)
            ->get();

        foreach ($images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        Image::whereIn('id', $images->pluck('id'))->delete();

        return redirect()->back();
    }
}
