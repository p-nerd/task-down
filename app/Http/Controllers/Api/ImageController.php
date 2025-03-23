<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
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
}
