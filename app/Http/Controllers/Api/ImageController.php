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
            'image' => 'required|image|max:5120',
        ]);

        $image = $request->file('image');
        $filename = str()->uuid().'.'.$image->getClientOriginalExtension();
        $path = $image->storeAs('images', $filename, 'public');
        $url = Storage::url($path);

        return response()->json(['url' => $url]);
    }
}
