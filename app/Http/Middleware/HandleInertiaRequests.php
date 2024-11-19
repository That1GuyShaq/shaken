<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {   $data = new \stdClass;
        if ($request->user()) {
            $name = explode(' ', $request->user()->name);
            $data->id = $request->user()->id;
            $data->first_name = $name[0];
            $data->last_name = end($name);
            $data->initials = strtoupper(substr($name[0], 0, 1) . substr($name[1], 0, 1));
            $data->profile_photo_url = $request->user()->profile_photo_url ? '/storage/' . $request->user()->profile_photo_url : null;
            $data->email = $request->user()->email;
            $data->email_verified = (bool)$request->user()->email_verified_at;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? $data : null,
            ],
        ];
    }
}
