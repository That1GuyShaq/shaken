<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Recipe;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = auth()->user();
    }
    public function index()
    {
        return Inertia::render('Dashboard/Dashboard', [
            'recipes' => $this->recipes()
        ]);
    }

    private function recipes()
    {
        $bookmarked   = $this->user->bookmarkedRecipes()->count();
        $unBookmarked = (new Recipe())->count() - $bookmarked;

        return [
            'un_bookmarked' => $unBookmarked,
            'bookmarked'    => $bookmarked
        ];
    }
}
