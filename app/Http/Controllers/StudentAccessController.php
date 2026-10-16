<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class StudentAccessController extends Controller
{
    /**
     * Display the main view: game if student is authenticated, or private welcome page.
     */
    public function home(Request $request): View
    {
        $student = null;
        $studentId = session('student_id');

        if ($studentId) {
            $student = Student::with('levelProgress')->where('id', $studentId)->where('is_active', true)->first();
        }

        if (! $student && $request->hasCookie('student_slug') && $request->hasCookie('student_token')) {
            $cookieSlug = (string) $request->cookie('student_slug');
            $cookieToken = (string) $request->cookie('student_token');
            $student = Student::with('levelProgress')
                ->where('slug', $cookieSlug)
                ->where('access_token', $cookieToken)
                ->where('is_active', true)
                ->first();

            if ($student) {
                session(['student_id' => $student->id]);
            }
        }

        if ($student) {
            $student->initializeLevels();

            return view('index', [
                'student' => $student,
            ]);
        }

        return view('welcome-private');
    }

    /**
     * Authenticate a student via personalized URL with slug and security token.
     */
    public function accessByLink(string $slug, string $token): RedirectResponse
    {
        $student = Student::where('slug', $slug)
            ->where('access_token', $token)
            ->where('is_active', true)
            ->first();

        if (! $student) {
            return redirect()->route('home')->with('error', 'El enlace de estudiante no es válido o ha expirado. Escríbenos por WhatsApp para ayudarte.');
        }

        $student->initializeLevels();
        session(['student_id' => $student->id]);
        cookie()->queue(cookie('student_slug', $student->slug, 60 * 24 * 30));
        cookie()->queue(cookie('student_token', $student->access_token, 60 * 24 * 30));

        return redirect()->route('home');
    }

    /**
     * Handle attempts to access using slug only without security token.
     */
    public function accessMissingToken(): RedirectResponse
    {
        return redirect()->route('home')->with('error', 'Por seguridad, el enlace debe incluir tu código de acceso privado. Escríbenos para enviártelo.');
    }

    /**
     * Clear student session and cookie.
     */
    public function logout(): RedirectResponse
    {
        session()->forget('student_id');
        cookie()->queue(cookie()->forget('student_slug'));
        cookie()->queue(cookie()->forget('student_token'));

        return redirect()->route('home');
    }
}
