<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use Illuminate\Http\Request;
use App\User;
//use Tymon\JWTAuth\Validators\Validator;
//use Illuminate\Validation\Validator;
use Illuminate\Support\Str;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

//use Validator, DB, Hash, Mail;


class AuthController extends Controller
{
    public $loginAfterSignUp = true;

    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }

        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });

        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }

        return response()->json([
            'success' => true, 'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }

    public function registerWithMail(Request $request)
    {
        $credentials = $request->only('name', 'email', 'password');

        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users'
        ];

        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        $user = User::create(['name' => $name, 'email' => $email, 'password' => Hash::make($password)]);

        $verification_code = Str::random(30); //Generate verification code
        DB::table('user_verifications')->insert(['user_id'=>$user->id,'token'=>$verification_code]);

        $subject = "Please verify your email address.";
        Mail::send('email.verify', ['name' => $name, 'verification_code' => $verification_code],
            function($mail) use ($email, $name, $subject){
//                $mail->from(getenv('FROM_EMAIL_ADDRESS'), "pusigator@gmail.com");
                $mail->from("pusigator@gmail.com", "pusigator@gmail.com");
                $mail->to($email, $name);
                $mail->subject($subject);
            });

        return response()->json(['success'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.']);
    }

    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();


        if(!is_null($check)){
            /*gleb*/echo '$check=<pre>'.print_r($check, true).'</pre>';//todo remove it
            $user = User::find($check->user_id);

            /*gleb*/echo '$user=<pre>'.print_r($user, true).'</pre>';//todo remove it
//            exit;
            if($user->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }

            $u2 = new User();
            $u2->where('id', $check->user_id)->update(['is_verified' => 1, 'email_verified_at' => Carbon::now()]);


            $isVer = $user->is_verified;
//            DB::table('user_verifications')->where('token',$verification_code)->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }

        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);

    }

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = auth()->login($user);

//        return $this->respondWithToken($token);

        $user['canEditCommonQuestions'] = true;
        $user['languageId'] = 1;

        return response()->json([
            'access_token' => $token,
            'user' => $user,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function login(Request $request)
    {
//        $credentials = $request->only(['email', 'password']);
        $credentials = $request->only(['name', 'password']);

        if (!$token = auth()->attempt($credentials, true)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();

        $user['canEditCommonQuestions'] = true;
        $user['languageId'] = 1;


        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);

//        return $this->respondWithToken($token);
    }
    public function getAuthUser(Request $request)
    {
        $user = auth()->user();
        $user['canEditCommonQuestions'] = true;
        $user['languageId'] = 1;
        $userData = response()->json($user);

//        $userData->set
//        $userData['data']['a'] = 'b';
//        /*gleb*/echo '$userData=<pre>'.print_r($userData, true).'</pre>';//todo remove it
        return $userData;
    }
    public function logout()
    {
        auth()->logout();
        return response()->json(['message'=>'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
