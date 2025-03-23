<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $width = fake()->numberBetween(800, 1920);
        $height = fake()->numberBetween(600, 1080);

        $filename = str()->uuid().'.jpg';
        $path = 'images/'.$filename;

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'filename' => $filename,
            'path' => $path,
            'url' => "https://picsum.photos/{$width}/{$height}",
            'size' => fake()->numberBetween(50000, 5000000),
            'mime_type' => 'image/jpeg',
        ];
    }
}
