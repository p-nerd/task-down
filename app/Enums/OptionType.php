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
     * Get human-readable name for the type
     */
    public function label(): string
    {
        return match ($this) {
            self::STRING => 'Text',
            self::BOOLEAN => 'True/False',
            self::INTEGER => 'Whole Number',
            self::FLOAT => 'Decimal Number',
            self::ARRAY => 'List',
            self::JSON => 'JSON Data',
        };
    }

    /**
     * Get all enum values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get appropriate cast type for a model property
     */
    public function getCastType(): string
    {
        return match ($this) {
            self::STRING => 'string',
            self::BOOLEAN => 'boolean',
            self::INTEGER => 'integer',
            self::FLOAT => 'float',
            self::ARRAY, self::JSON => 'array',
        };
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
