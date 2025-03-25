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
     * Set the value attribute with serialization for array/json types.
     */
    public function setValueAttribute(mixed $value): void
    {
        if ($this->type && ($this->type === OptionType::ARRAY || $this->type === OptionType::JSON)) {
            if (! is_string($value)) {
                $value = json_encode($value);
            }
        }

        $this->attributes['value'] = $value;
    }
}
