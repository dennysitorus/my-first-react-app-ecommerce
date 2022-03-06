<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        return $user;
    }

    public function login(Request $request)
    {
        $response = [];
        $user = User::where('EMAIL', $request->email)->first();
        if (!$user || Hash::check($request->password, $user->password)) {
            $response['status'] = false;
            $response['message'] = 'User does not exist or Password does not match.';
            $response['user'] = null;
        }
        else {
            $response['status'] = true;
            $response['message'] = 'Login success.';
            $response['user'] = $user;
        }

        return $response;
    }
}
