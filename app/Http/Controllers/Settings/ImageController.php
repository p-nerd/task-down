<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Response;

class ImageController extends Controller
{
    /**
     * Show the user's images settings page.
     */
    public function edit(): Response
    {
        return inertia('settings/images');
    }
}
