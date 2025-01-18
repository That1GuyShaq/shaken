<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Essentials;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\EssentialsTableResource;

class EssentialsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Essentials/Index', [
            'categories' => Category::essentialsListing(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Essentials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name'        => ['required', 'string', 'max:255', 'unique:essentials'],
            'category'    => ['required', 'numeric', 'exists:categories,id'],
            'description' => ['required', 'string', 'max:255'],
            'tags'        => ['required', 'array'],
        ]);

        if ($validation->fails())
        {
            return response()->json([
                'success' => false,
                'errors' => $validation->errors(),
            ]);
        }

        Essentials::create([
            'name'        => $request->name,
            'category'    => $request->category,
            'description' => $request->description,
            'tags'        => $request->tags,
            'user_id'     => auth()->user()->id,
            'generated'   => false,
        ]);

        session()->flash('reload', true);

        return response()->json([
            'success' => "Essential $request->name created successfully",
            'errors' => $validation->errors(),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Essentials $essential)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Essentials $essential)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Essentials $essential)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Essentials $essential)
    {
        $bookmark = $essential->bookmarked()->where('user_id', auth()->user()->id)->first();
        try {
            if ($essential->user_id !== auth()->user()->id) {
                return response()->json(null, 401);
            } else if ($bookmark) {
                $bookmark->delete();
                $essential->delete();
            } else {
                $essential->delete();
            }
        } catch (\Throwable $th) {
            return response(status: 500)->json([
                'error' => $th->getMessage(),
            ], $th->getCode());
        }

        return response()->json(null,204);
    }

    /**
     * Returns a list of essentials.
     */
    public function list(Request $request)
    {
        $user = User::find(auth()->user()->id);

        if ($request->source === 'global') {
            $essentials = Essentials::all()->sortBy('name');
        }else {
            $essentials = $user->bookmarkedEsentials();
        }

        return EssentialsTableResource::collection($essentials);
    }
}
