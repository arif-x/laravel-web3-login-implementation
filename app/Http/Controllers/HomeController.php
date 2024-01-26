<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function save(Request $request)
    {
        if ($request->password) {
            User::where('id', auth()->user()->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
        } else {
            User::where('id', auth()->user()->id)->update([
                'name' => $request->name,
                'email' => $request->email
            ]);
        }
        return redirect('/dashboard');
    }
}
