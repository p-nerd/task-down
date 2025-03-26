<?php

namespace App\Models;

use App\Enums\OptionType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\NoteFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'content',
        'order',
    ];

    /**
     * Get the user that owns the note.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function getInitialSidebarVisibility(): ?Option
    {
        return Option::get(Option::NOTES_INITIAL_SIDEBAR_VISIBILITY);
    }

    public static function setInitialSidebarVisibility(int $value): Option
    {
        return Option::set(
            key: Option::NOTES_INITIAL_SIDEBAR_VISIBILITY,
            value: $value,
            type: OptionType::INTEGER,
        );
    }
}
