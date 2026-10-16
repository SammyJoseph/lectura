<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Aprende a Leer y Escribir - Acceso Privado</title>
	<link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}" />

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@600;700;800;900&display=swap"
		rel="stylesheet">

	<script src="https://cdn.tailwindcss.com"></script>
	<link rel="stylesheet" type="text/css" href="{{ asset('assets/styles.css') }}">
</head>

<body class="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">

	<div class="max-w-md w-full bg-white rounded-[36px] p-6 sm:p-8 shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
		<!-- Decoración sutil de fondo -->
		<div class="absolute -top-12 -right-12 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-70"></div>
		<div class="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-100 rounded-full blur-2xl opacity-70"></div>

		<!-- Icono principal -->
		<div class="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 border-4 border-white shadow-lg flex items-center justify-center text-5xl mb-4 animate-bounce">
			🎒
		</div>

		<span class="px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-300 mb-2">
			Espacio Educativo Privado
		</span>

		<h1 class="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-tight mb-3">
			Aprende a Leer y Escribir
		</h1>

		<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-semibold">
			¡Hola! Esta aventura interactiva está diseñada con cariño para guiar el aprendizaje de la lectura paso a paso. El progreso de cada niño es personalizado y se accede mediante un enlace único.
		</p>

		@if (session('error'))
			<div class="w-full mb-5 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 text-xs font-bold">
				{{ session('error') }}
			</div>
		@endif

		<!-- Botón principal de WhatsApp -->
		<a href="https://wa.me/51971893196?text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20un%20enlace%20de%20acceso%20para%20mi%20peque"
			target="_blank" rel="noopener noreferrer"
			class="btn-3d w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg transition-transform transform active:scale-95"
			style="--btn-shadow: #059669; box-shadow: 0 4px 0 #059669;">
			<span class="text-2xl">📲</span>
			<span>Pedir cuenta por WhatsApp</span>
		</a>
	</div>

</body>

</html>
