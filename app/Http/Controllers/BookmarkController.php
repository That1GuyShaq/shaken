<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function bookmark(int $id, string $bookmarked, int | null $count = 0)
    {
        $response = [];

        try {
            $user = auth()->user();
            $recipe = Recipe::findOrFail($id);
            $bookmark_exists = $recipe->bookmarks()->where('user_id', $user->id)->exists();

            if ($bookmarked == 'true' && $bookmark_exists) {
                $recipe->bookmarks()->where('user_id',$user->id)->delete();
                $response = ['success' => 'Recipe un-bookmarked successfully.'];
            } else if($bookmarked == 'false' && !$bookmark_exists) {
                $recipe->bookmarks()->create([
                    'user_id' => $user->id,
                    'made'    => $count ? $count : 0
                ]);
                $response = ['success' => 'Recipe bookmarked successfully.'];
            } else {
                throw new \Exception('Something went wrong. Please refresh the page before trying again.');
            }

        } catch (\Throwable $th) {
            $response = ['error' => $th->getMessage()];
        }

        return response()->json($response);
    }
}
