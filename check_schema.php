<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;

$tables = [
    'alias_pool', 'categories', 'menfess_aliases', 'menfess_shares', 
    'notifications', 'payment_methods', 'point_transactions', 
    'product_images', 'products', 'reports', 'settings'
];

foreach ($tables as $t) {
    if (Schema::hasTable($t)) {
        echo "=== TABLE: $t ===\n";
        $columns = Schema::getColumns($t);
        foreach ($columns as $c) {
            echo "- " . $c['name'] . " : " . $c['type_name'] . "\n";
        }
        echo "\n";
    }
}
