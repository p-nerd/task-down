<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'name' => fake()->name(),
            'content' => $this->generateMarkdownContent(),
            'created_at' => fake()->dateTimeBetween('-1 year', '-1 day'),
            'updated_at' => fn (array $attributes) => fake()->dateTimeBetween($attributes['created_at'], 'now'),
        ];
    }

    /**
     * Generate random markdown content with various features
     */
    private function generateMarkdownContent(): string
    {
        $markdownElements = [
            $this->generateHeading(),
            $this->generateQuote(),
            $this->generateList(),
            $this->generateThematicBreak(),
            $this->generateLink(),
            $this->generateTable(),
        ];

        // Shuffle elements and take 2-4 random elements
        shuffle($markdownElements);
        $selectedElements = array_slice($markdownElements, 0, fake()->numberBetween(2, 4));

        return implode("\n\n", $selectedElements);
    }

    /**
     * Generate a random markdown heading
     */
    private function generateHeading(): string
    {
        $level = fake()->numberBetween(1, 3);
        $hashes = str_repeat('#', $level);

        return "{$hashes} ".fake()->sentence();
    }

    /**
     * Generate a random markdown quote
     */
    private function generateQuote(): string
    {
        $quotes = [
            fake()->realText(100),
            fake()->catchPhrase(),
            fake()->text(50),
            fake()->sentence(10),
        ];

        return '> '.fake()->randomElement($quotes);
    }

    /**
     * Generate a random markdown list
     */
    private function generateList(): string
    {
        $items = [];
        $itemCount = fake()->numberBetween(3, 5);

        // Randomly choose between ordered and unordered lists
        $isOrdered = fake()->boolean();

        for ($i = 0; $i < $itemCount; $i++) {
            $prefix = $isOrdered ? ($i + 1).'.' : '-';
            $items[] = "$prefix ".fake()->sentence();
        }

        return implode("\n", $items);
    }

    /**
     * Generate a random markdown thematic break
     */
    private function generateThematicBreak(): string
    {
        $breaks = ['---', '***', '___'];

        return fake()->randomElement($breaks);
    }

    /**
     * Generate a random markdown link
     */
    private function generateLink(): string
    {
        $text = fake()->words(fake()->numberBetween(2, 4), true);
        $url = fake()->url();

        return "[{$text}]({$url})";
    }

    /**
     * Generate a random markdown table
     */
    private function generateTable(): string
    {
        $headers = ['Name', 'Age', 'City'];
        $table = '| '.implode(' | ', $headers)." |\n";
        $table .= '| '.implode(' | ', array_fill(0, count($headers), '---'))." |\n";

        $rows = fake()->numberBetween(2, 4);
        for ($i = 0; $i < $rows; $i++) {
            $rowData = [
                fake()->name(),
                fake()->numberBetween(18, 80),
                fake()->city(),
            ];
            $table .= '| '.implode(' | ', $rowData)." |\n";
        }

        return $table;
    }
}
