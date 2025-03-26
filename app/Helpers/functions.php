<?php

if (! function_exists('production')) {
    function production(): bool|string
    {
        return app()->environment('production');
    }
}
