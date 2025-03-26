<?php

if (! function_exists('production')) {
    function production(): bool
    {
        return app()->environment('production');
    }
}
