<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\OptionType;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasUlids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all images belonging to the user.
     */
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    /**
     * Get the notes for the user.
     */
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    /**
     * Option key for controlling the initial visibility state of the notes sidebar
     */
    public const NOTES_INITIAL_SIDEBAR_VISIBILITY = 'notes_initial_sidebar_visibility';

    /**
     * Retrieves the global setting for initial sidebar visibility state
     */
    public function getNotesInitialSidebarVisibility(): bool
    {
        return Option::getValue(self::NOTES_INITIAL_SIDEBAR_VISIBILITY, $this->id, true); // @phpstan-ignore-line
    }

    /**
     * Updates the global setting for initial sidebar visibility state
     */
    public function setNotesInitialSidebarVisibility(int $value): Option
    {
        return Option::set(self::NOTES_INITIAL_SIDEBAR_VISIBILITY, $value, OptionType::BOOLEAN, $this->id); // @phpstan-ignore-line
    }

    public const IMAGES_INITIAL_VIEW_MODE = 'images_initial_view_mode';

    public function getImagesInitialViewMode(): string
    {
        return Option::getValue(self::IMAGES_INITIAL_VIEW_MODE, $this->id, 'list'); // @phpstan-ignore-line
    }

    public function setImagesInitialViewMode(string $value): Option
    {
        return Option::set(self::IMAGES_INITIAL_VIEW_MODE, $value, OptionType::STRING, $this->id); // @phpstan-ignore-line
    }
}
