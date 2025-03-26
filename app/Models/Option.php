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
        'user_id',
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

    /**
     * Get an option by key.
     */
    public static function get(string $key, string $userId, mixed $default = null): mixed
    {
        $option = static::where('key', $key)->where('user_id', $userId)->first();
        if (! $option) {
            return $default;
        }

        return $option;
    }

    /**
     * Get an option value by key.
     */
    public static function getValue(string $key, string $userId, mixed $default = null): mixed
    {
        $option = static::get($key, $userId);
        if (! $option) {
            return $default;
        }

        return $option->value;
    }

    /**
     * Set an option value by key.
     */
    public static function set(string $key, mixed $value, ?OptionType $type, ?string $userId = null, ?string $description = null): Option
    {
        $option = static::firstOrNew([
            'key' => $key,
            'user_id' => $userId,
        ]);

        if ($type !== null) {
            $option->type = $type;
        } elseif (! $option->exists) {
            $option->type = match (true) {
                is_bool($value) => OptionType::BOOLEAN,
                is_int($value) => OptionType::INTEGER,
                is_float($value) => OptionType::FLOAT,
                is_array($value) => OptionType::ARRAY,
                default => OptionType::STRING,
            };
        }

        $option->value = $value;

        if ($description !== null) {
            $option->description = $description;
        }

        $option->save();

        return $option;
    }
}
