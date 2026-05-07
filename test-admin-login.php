<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Test admin exists
$admin = App\Models\Admin::where('email', 'admin@gmail.com')->first();

if ($admin) {
    echo "✓ Admin found: {$admin->email}\n";
    echo "✓ Name: {$admin->name}\n";
    
    // Test password
    $passwordCheck = Hash::check('admin123', $admin->password);
    echo "✓ Password check: " . ($passwordCheck ? 'VALID' : 'INVALID') . "\n";
    
    // Test auth attempt
    $authResult = Auth::guard('admin')->attempt([
        'email' => 'admin@gmail.com',
        'password' => 'admin123'
    ]);
    echo "✓ Auth attempt: " . ($authResult ? 'SUCCESS' : 'FAILED') . "\n";
} else {
    echo "✗ Admin not found\n";
}
