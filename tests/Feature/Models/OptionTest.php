<?php

use App\Enums\OptionType;
use App\Models\Option;
use Illuminate\Support\Facades\DB;

it('can create an option', function () {
    $option = Option::create([
        'key' => 'test_key',
        'value' => 'test_value',
        'type' => OptionType::STRING,
        'description' => 'Test description',
    ]);

    expect($option)
        ->toBeInstanceOf(Option::class)
        ->key->toBe('test_key')
        ->description->toBe('Test description')
        ->type->toBe(OptionType::STRING)
        ->value->toBe('test_value');
});

it('casts string values correctly', function () {
    $option = Option::create([
        'key' => 'site_name',
        'value' => 'Test Site',
        'type' => OptionType::STRING,
    ]);

    expect($option->value)
        ->toBeString()
        ->toBe('Test Site');

    $option->value = 123;
    $option->save();
    $option->refresh();

    expect($option->value)
        ->toBeString()
        ->toBe('123');
});

it('casts boolean values correctly', function () {
    $option = Option::create([
        'key' => 'feature_enabled',
        'value' => true,
        'type' => OptionType::BOOLEAN,
    ]);

    expect($option->value)
        ->toBeBool()
        ->toBeTrue();

    $rawValue = DB::table('options')
        ->where('id', $option->id)
        ->value('value');
    expect($rawValue)->toBe('1');

    $option->value = false;
    $option->save();
    $option->refresh();

    expect($option->value)
        ->toBeBool()
        ->toBeFalse();

    $rawValue = DB::table('options')
        ->where('id', $option->id)
        ->value('value');
    expect($rawValue)->toBe('0');
});

it('casts integer values correctly', function () {
    $option = Option::create([
        'key' => 'items_per_page',
        'value' => 25,
        'type' => OptionType::INTEGER,
    ]);

    expect($option->value)
        ->toBeInt()
        ->toBe(25);

    $option->value = '42';
    $option->save();
    $option->refresh();

    expect($option->value)
        ->toBeInt()
        ->toBe(42);

    $rawValue = DB::table('options')
        ->where('id', $option->id)
        ->value('value');
    expect($rawValue)->toBe('42');
});

it('casts float values correctly', function () {
    $option = Option::create([
        'key' => 'tax_rate',
        'value' => 7.5,
        'type' => OptionType::FLOAT,
    ]);

    expect($option->value)
        ->toBeFloat()
        ->toBe(7.5);

    $option->value = '3.14159';
    $option->save();
    $option->refresh();

    expect($option->value)
        ->toBeFloat()
        ->toBe(3.14159);

    $rawValue = DB::table('options')
        ->where('id', $option->id)
        ->value('value');
    expect($rawValue)->toBe('3.14159');
});

// it('casts array values correctly', function () {
//     $testArray = ['example.com', 'test.org'];
//
//     $option = Option::create([
//         'key' => 'allowed_domains',
//         'value' => $testArray,
//         'type' => OptionType::ARRAY,
//     ]);
//
//     expect($option->value)
//         ->toBeArray()
//         ->toBe($testArray);
//
//     $rawValue = DB::table('options')
//         ->where('id', $option->id)
//         ->value('value');
//     expect($rawValue)->toBe(json_encode($testArray));
//
//     $jsonString = '["one","two","three"]';
//     $option->value = $jsonString;
//     $option->save();
//     $option->refresh();
//
//     expect($option->value)
//         ->toBeArray()
//         ->toBe(['one', 'two', 'three']);
// });

// it('casts json values correctly', function () {
//     $testJson = ['theme' => 'dark', 'notifications' => true];
//
//     $option = Option::create([
//         'key' => 'site_settings',
//         'value' => $testJson,
//         'type' => OptionType::JSON,
//     ]);
//
//     expect($option->value)
//         ->toBeArray()
//         ->toBe($testJson);
//
//     $rawValue = DB::table('options')
//         ->where('id', $option->id)
//         ->value('value');
//     expect($rawValue)->toBe(json_encode($testJson));
// });

// it('handles null type values correctly', function () {
//     $option = Option::create([
//         'key' => 'no_type_specified',
//         'value' => 'raw value',
//         'type' => null,
//     ]);
//
//     expect($option->value)->toBe('raw value');
//
//     $testArray = ['should', 'stay', 'array'];
//     $option->value = $testArray;
//     $option->save();
//
//     expect($option->refresh()->value)
//         ->toBe($testArray);
// });
