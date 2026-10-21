<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Aprende a Leer y Escribir</title>
	<link rel="icon" type="image/png" href="images/favicon.png" />

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@600;700;800;900&display=swap"
		rel="stylesheet">

	<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

	<link rel="stylesheet" type="text/css" href="{{ asset('assets/styles.css?v=0.006') }}">
	
	@vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>

	<livewire:game-screen :student="$student" />

	<script src="{{ asset('assets/scripts.js?v=0.006') }}"></script>
</body>

</html>