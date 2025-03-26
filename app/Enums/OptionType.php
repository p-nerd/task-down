<?php

namespace App\Enums;

enum OptionType: string
{
    case STRING = 'string';
    case BOOLEAN = 'boolean';
    case INTEGER = 'integer';
    case FLOAT = 'float';
    case ARRAY = 'array';
    case JSON = 'json';

    /**
     * Get all enum values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Convert a value to the appropriate type
     */
    public function castValue(mixed $value): mixed
    {
        return match ($this) {
            self::STRING => (string) $value,
            self::BOOLEAN => (bool) $value,
            self::INTEGER => (int) $value,
            self::FLOAT => (float) $value,
            self::ARRAY, self::JSON => is_string($value) ? json_decode($value, true) : $value,
        };
    }
}
