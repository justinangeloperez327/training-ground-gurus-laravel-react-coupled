<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterEmployerController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/register-employer');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'company_name' => 'required|string|max:255',
            'company_address' => 'nullable|string|max:255',
            'company_website' => 'nullable|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'employer',
        ]);

        $company = Company::create([
            'name' => $request->company_name,
            'address' => $request->company_address,
            'website' => $request->company_website,
            'user_id' => $user->id,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
