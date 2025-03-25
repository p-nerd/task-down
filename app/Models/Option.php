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
     * Get the setting value with appropriate casting.
     */
    public function getTypedValueAttribute(): mixed
    {
        return $this->type->castValue($this->value);
    }

    /**
     * Set the value with appropriate handling based on type.
     */
    public function setTypedValueAttribute(mixed $value): void
    {
        if (in_array($this->type, [OptionType::ARRAY, OptionType::JSON]) && ! is_string($value)) {
            $this->attributes['value'] = json_encode($value);
        } else {
            $this->attributes['value'] = (string) $value;
        }
    }

    /**
     * Get a setting by key.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();

        if (! $setting) {
            return $default;
        }

        return $setting->typed_value;
    }

    /**
     * Set a option value by key.
     */
    public static function set(string $key, mixed $value, ?string $type = null): Option
    {
        $setting = static::firstOrNew(['key' => $key]);

        if ($type) {
            $setting->type = $type;
        } elseif (! $setting->exists) {
            // Auto-detect type if not specified and setting doesn't exist yet
            if (is_bool($value)) {
                $setting->type = OptionType::BOOLEAN;
            } elseif (is_int($value)) {
                $setting->type = OptionType::INTEGER;
            } elseif (is_float($value)) {
                $setting->type = OptionType::FLOAT;
            } elseif (is_array($value)) {
                $setting->type = OptionType::ARRAY;
            } else {
                $setting->type = OptionType::STRING;
            }
        }

        $setting->typed_value = $value;
        $setting->save();

        return $setting;
    }
}
