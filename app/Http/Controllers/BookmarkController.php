<?php

namespace App\Http\Controllers;

use App\Models\Essentials;
use App\Models\Recipe;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function bookmark(int $id, string $bookmarked, string $subject, int | null $count = 0)
    {
        $response = [];

        try {
            $user = auth()->user();

            switch ($subject) {
                case 'recipe':
                    $subject = Recipe::findOrFail($id);
                    break;
                case 'essentials':
                    $subject = Essentials::findOrFail($id);
                    break;

                default: throw new \Exception('Something went wrong. Please refresh the page before trying again.');
            };

            $exists = $subject->bookmarks()->where('user_id', $user->id)->exists();
            if ($bookmarked == 'true' && $exists) {
                $subject->bookmarks()->where('user_id',$user->id)->delete();
                $response = ['success' => 'Recipe un-bookmarked successfully.'];

            } else if($bookmarked == 'false' && !$exists) {
                $bookmark = new Bookmark([
                    'user_id' => $user->id,
                    'made'    => $count ? $count : 0
                ]);
                // dd($bookmark);
                $subject->bookmarks()->save($bookmark);
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
