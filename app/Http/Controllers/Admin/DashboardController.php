<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function users()
    {
        return Inertia::render('Admin/Users');
    }

    public function moderation()
    {
        return Inertia::render('Admin/Moderation');
    }

    public function marketplace()
    {
        return Inertia::render('Admin/Marketplace');
    }

    public function polls()
    {
        return Inertia::render('Admin/Polls');
    }

    public function notifications()
    {
        return Inertia::render('Admin/Notifications');
    }

    public function sponsors()
    {
        return Inertia::render('Admin/Sponsors');
    }
}
