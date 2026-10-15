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

        if (! $student && $request->hasCookie('student_slug')) {
            $cookieSlug = (string) $request->cookie('student_slug');
            $student = Student::with('levelProgress')->where('slug', $cookieSlug)->where('is_active', true)->first();
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
     * Authenticate a student via personalized URL slug (e.g. /amelie-taboada).
     */
    public function accessBySlug(string $slug): RedirectResponse
    {
        $student = Student::where('slug', $slug)->where('is_active', true)->first();

        if (! $student) {
            return redirect()->route('home')->with('error', 'El enlace de estudiante no existe o está inactivo. Escríbenos por WhatsApp para ayudarte.');
        }

        $student->initializeLevels();
        session(['student_id' => $student->id]);
        cookie()->queue(cookie('student_slug', $student->slug, 60 * 24 * 30));

        return redirect()->route('home');
    }

    /**
     * Clear student session and cookie.
     */
    public function logout(): RedirectResponse
    {
        session()->forget('student_id');
        cookie()->queue(cookie()->forget('student_slug'));

        return redirect()->route('home');
    }
}
