<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfilePhotoUpdateRequest;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // $user = new UserResource($request->user());
        // dd($user);
        // dd(URL::asset($request->user()->profile_photo_url));
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => !$request->user()->hasVerifiedEmail(),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's profile photo.
     */
    public function upload(Request $request): RedirectResponse
    {
        $path = null;

        if ($request->hasFile('photo')) {
           if ($request->user()->profile_photo_url) {
               Storage::disk('public')->delete($request->user()->profile_photo_url);
           }
           $path = $request->file('photo')->store('profile-photos', 'public');
        }

        if ($request->user()->profile_photo_url && !$request->hasFile('photo')) {
            Storage::disk('public')->delete($request->user()->profile_photo_url);
        }

        $request->user()->fill([
            'profile_photo_url' => $path,
        ]);

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
