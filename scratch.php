<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "admin.login URL => " . route('admin.login') . "\n";
echo "login URL => " . route('login') . "\n";
