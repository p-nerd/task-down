<?php

namespace App\Models;

use App\Enums\OptionType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => OptionType::class,
        ];
    }

    /**
     * Get the value attribute with proper type casting.
     */
    public function getValueAttribute(mixed $value): mixed
    {
        if (! $this->type) {
            return $value;
        }

        return $this->type->castValue($value);
    }

    /**
     * Set the value attribute with proper type conversion for database storage.
     */
    public function setValueAttribute(mixed $value): void
    {
        if (! $this->type) {
            $this->attributes['value'] = $value;

            return;
        }

        $this->attributes['value'] = match ($this->type) {
            OptionType::STRING => (string) $value,
            OptionType::BOOLEAN => $value ? '1' : '0',
            OptionType::INTEGER => (string) (int) $value,
            OptionType::FLOAT => (string) (float) $value,
            OptionType::ARRAY, OptionType::JSON => is_string($value) ? $value : json_encode($value),
            default => $value,
        };
    }
}
