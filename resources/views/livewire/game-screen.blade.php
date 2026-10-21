<div class="w-full flex flex-col items-center">
	{{-- ====================================================================
	     1. MENÚ PRINCIPAL DE AVENTURA (SELECCIÓN DE 4 NIVELES)
	     ==================================================================== --}}
	<div id="adventure-menu" class="adventure-container {{ $activeLevel === 0 ? '' : 'hidden' }}">
			<!-- Barra superior de estudiante -->
			<header class="top-bar w-full justify-between gap-3">
				<div class="flex items-center gap-2">
					<span class="text-2xl">{{ $studentAvatar }}</span>
					<div class="text-left">
						<h2 class="font-display text-base font-bold text-slate-800 leading-tight">{{ $studentName }}</h2>
						<span class="text-[11px] font-bold text-slate-400">Estudiante</span>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3 py-1 rounded-2xl shadow-sm">
						<span class="text-lg">⭐</span>
						<span class="font-display text-base font-bold text-amber-900">
							{{ array_sum(array_column($levels, 'stars')) }}
						</span>
						<span class="text-xs font-extrabold text-amber-700 hidden sm:inline">totales</span>
					</div>

					<a href="{{ route('student.logout') }}"
						title="Cambiar de estudiante"
						class="btn-3d btn-pill bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300 text-xs py-1.5 px-3">
						<span>🚪</span>
						<span class="hidden sm:inline">Salir</span>
					</a>
				</div>
			</header>

			<!-- Título del Menú -->
			<div class="text-center my-2 sm:my-3">
				<h1 class="font-display text-3xl sm:text-4xl font-bold text-slate-800 tracking-wide mb-1.5">
					✨ Mundos de Aventura ✨
				</h1>
				<p class="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
					Supera cada mundo para desbloquear nuevas aventuras y sorpresas
				</p>
			</div>

			<!-- Grid de 4 Niveles -->
			<div class="level-grid">
				@foreach ($levels as $lvl => $data)
					<div class="level-card {{ $data['is_unlocked'] ? 'unlocked border-2 ' . ($data['border'] ?? 'border-indigo-300') : 'locked' }}">
						<div>
							<!-- Encabezado de la tarjeta -->
							<div class="flex items-center justify-between mb-2">
								<span class="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full
									{{ $data['is_unlocked'] ? ($data['badge_class'] ?? 'bg-indigo-100 text-indigo-800 border border-indigo-300') : 'bg-slate-200 text-slate-600' }}">
									@if ($data['is_unlocked'])
										⭐ NIVEL {{ $lvl }}
									@else
										🔒 NIVEL {{ $lvl }}
									@endif
								</span>

								@if ($data['is_unlocked'])
									<span class="text-xs font-extrabold {{ $data['unlocked_text'] ?? 'text-indigo-600' }} flex items-center gap-1">
										<span>¡Desbloqueado!</span>
									</span>
								@else
									<span class="text-xl lock-wobble cursor-pointer" title="Bloqueado">🔒</span>
								@endif
							</div>

							<!-- Título y descripción -->
							<h3 class="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-1">
								{{ $data['name'] }}
							</h3>
							<p class="text-xs sm:text-sm text-slate-500 font-semibold mb-4">
								{{ $data['description'] }}
							</p>
						</div>

						<!-- Barra de progreso de estrellas -->
						<div class="mt-auto">
							<div class="flex items-center justify-between text-xs font-black mb-1.5">
								<span class="text-slate-500 uppercase tracking-wider">Progreso</span>
								<span class="text-amber-800 font-display text-sm font-bold flex items-center gap-1">
									<span>⭐</span>
									<span>{{ $data['stars'] }} / {{ $data['target'] }}</span>
								</span>
							</div>

							@php
								$percent = min(100, (int) round(($data['stars'] / max(1, $data['target'])) * 100));
							@endphp
							<div class="progress-bar-track mb-4">
								<div class="progress-bar-fill" style="width: {{ $percent }}%; background: {{ $data['progress_gradient'] ?? 'linear-gradient(90deg, #818cf8 0%, #6366f1 100%)' }};"></div>
							</div>

							<!-- Botón de acción -->
							@if ($data['is_unlocked'])
								<button wire:click="selectLevel({{ $lvl }})"
									class="btn-3d w-full py-3 px-4 rounded-2xl {{ $data['btn_class'] ?? 'bg-indigo-500 hover:bg-indigo-600' }} text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2"
									style="--btn-shadow: {{ $data['btn_shadow'] ?? '#4338ca' }}; box-shadow: 0 4px 0 {{ $data['btn_shadow'] ?? '#4338ca' }};">
									<span>¡JUGAR!</span>
									<span>🚀</span>
								</button>
							@else
								<div class="w-full py-2.5 px-3 rounded-2xl bg-slate-100 text-slate-400 font-bold text-xs text-center border border-slate-200 flex items-center justify-center gap-1.5">
									<span>🔒</span>
									<span>Consigue {{ $levels[$lvl - 1]['target'] ?? 100 }} ⭐ en el Nivel {{ $lvl - 1 }}</span>
								</div>
							@endif
						</div>
					</div>
				@endforeach
			</div>
	</div>

	{{-- ====================================================================
	     2. PANTALLA DE JUEGO (NIVEL ACTIVO)
	     ==================================================================== --}}
	<div id="game-arena" class="w-full flex flex-col items-center {{ $activeLevel > 0 ? '' : 'hidden' }}"
		data-words="{{ json_encode($activeWords) }}"
		data-level="{{ $activeLevel }}"
		data-stars="{{ $levels[$activeLevel > 0 ? $activeLevel : 1]['stars'] ?? 0 }}"
		data-target="{{ $levels[$activeLevel > 0 ? $activeLevel : 1]['target'] ?? 100 }}">
		<header class="top-bar game-top-bar w-full max-w-[480px] flex items-center justify-between">
			<!-- Botón volver al Menú -->
			<button wire:click="returnToMenu" id="btn-return-menu"
				class="btn-3d btn-pill bg-sky-100 hover:bg-sky-200 text-sky-800 border-sky-300 font-extrabold text-sm"
				style="--btn-shadow: #38bdf8; box-shadow: 0 3px 0 #38bdf8;"
				title="Volver a elegir nivel">
				<span>🏠</span>
				<span class="font-display font-bold">Menú</span>
			</button>

			<!-- Selector Mayúsculas / Minúsculas -->
			<button id="btn-toggle-case" class="btn-3d btn-pill bg-purple-100 text-purple-800 border-purple-300"
				style="--btn-shadow: #c084fc; box-shadow: 0 3px 0 #c084fc;" title="Cambiar MAYÚSCULAS / minúsculas">
				<span>🔤</span>
				<span id="label-case-desktop">MAYÚSCULAS</span>
				<span id="label-case-mobile">MAY</span>
			</button>

			<!-- Modo de juego: Aleatorio / Hablar / Armar (Nivel 2) -->
			<button id="btn-toggle-mode" class="btn-3d btn-pill bg-indigo-100 text-indigo-800 border-indigo-300"
				style="--btn-shadow: #818cf8; box-shadow: 0 3px 0 #818cf8;" title="Toca para cambiar modo">
				<span id="mode-toggle-icon">🎲</span>
				<span id="mode-toggle-label">Aleatorio</span>
			</button>

			<!-- Badge informativo fijo para Nivel 1 -->
			<div id="badge-level1-mode" class="hidden btn-pill bg-indigo-100 text-indigo-800 border-indigo-300 font-extrabold text-xs py-1.5 px-3 flex items-center gap-1.5">
				<span>👂</span>
				<span class="font-bold">Escucho y Toco</span>
			</div>
		</header>

		<main class="game-card" wire:ignore>
			<div class="w-full flex items-center justify-between mb-1">
				<span id="mode-badge"
					class="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide bg-rose-100 text-rose-700">
					🎤 LEO Y HABLO
				</span>
				<span id="level-name-badge" class="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
					Nivel {{ $activeLevel > 0 ? $activeLevel : 1 }}
				</span>
			</div>

			<!-- Barra de progreso del nivel adentro del juego -->
			<div id="game-progress-wrapper" class="w-full my-2 px-1 relative">
				<div class="flex items-center justify-between text-xs font-black mb-1.5">
					<span class="text-slate-500 uppercase tracking-wider">Progreso</span>
					<span class="text-amber-800 font-display text-sm font-bold flex items-center gap-1">
						<span id="game-progress-star-icon" class="inline-block">⭐</span>
						<span id="game-progress-stars">{{ $levels[$activeLevel > 0 ? $activeLevel : 1]['stars'] ?? 0 }}</span>
						<span class="text-slate-400 font-normal">/</span>
						<span id="game-progress-target">{{ $levels[$activeLevel > 0 ? $activeLevel : 1]['target'] ?? 100 }}</span>
					</span>
				</div>

				@php
					$currStars = $levels[$activeLevel > 0 ? $activeLevel : 1]['stars'] ?? 0;
					$currTarget = max(1, $levels[$activeLevel > 0 ? $activeLevel : 1]['target'] ?? 100);
					$currPercent = min(100, (int) round(($currStars / $currTarget) * 100));
				@endphp
				<div class="progress-bar-track relative overflow-hidden">
					<div id="game-progress-fill" class="progress-bar-fill relative {{ $currPercent === 0 ? 'is-empty' : '' }}" style="width: {{ $currPercent }}%; background: {{ $levels[$activeLevel > 0 ? $activeLevel : 1]['progress_gradient'] ?? 'linear-gradient(90deg, #818cf8 0%, #6366f1 100%)' }};">
						<div id="game-progress-shimmer" class="progress-bar-shimmer"></div>
					</div>
				</div>

				<!-- Indicador flotante animado (+1 ⭐) al resolver un ejercicio -->
				<div id="game-progress-floater" class="pointer-events-none absolute right-2 -top-1 opacity-0 font-display font-black text-sm text-amber-500 flex items-center gap-0.5 select-none">
					<span>+1</span>
					<span>⭐</span>
				</div>
			</div>

			<div id="emoji-btn" class="emoji-circle mystery">
				<span id="word-emoji" class="select-none">❓</span>
				<span id="emoji-speaker-badge"
					class="hidden absolute bottom-1 right-1 bg-white w-8 h-8 rounded-full shadow-md border border-slate-200 flex items-center justify-center text-sm">
					🔊
				</span>
			</div>

			<div id="audio-controls-row" class="hidden flex items-center justify-center gap-3 my-2">
				<button id="btn-listen-word" class="btn-3d btn-listen">
					<span>🔊</span>
					<span>ESCUCHAR</span>
				</button>
				<button id="btn-listen-slow" class="btn-3d btn-slow">
					<span>🐢</span>
					<span>SÍLABAS</span>
				</button>
			</div>

			<!-- Sección Nivel 1: Discriminación de Sílabas (Escucho y Toco, texto puro) -->
			<section id="section-syllables" class="hidden w-full flex flex-col items-center my-1">
				<button id="btn-replay-syllable" class="btn-3d flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-sm sm:text-base my-2"
					style="--btn-shadow: #4338ca; box-shadow: 0 4px 0 #4338ca;" title="Toca para escuchar de nuevo">
					<span class="text-xl animate-pulse">🔊</span>
					<span class="font-display tracking-wide">¡TOCA PARA ESCUCHAR!</span>
				</button>

				<p class="text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider my-1.5 text-center">
					¿Dónde dice esta sílaba?
				</p>

				<div id="syllables-grid" class="grid grid-cols-2 gap-3.5 w-full max-w-[340px] my-3">
					<!-- Se inyectan dinámicamente las tarjetas de sílabas -->
				</div>
			</section>

			<!-- Sección Modo A: Leo y Hablo -->
			<section id="section-mode-a" class="w-full flex flex-col items-center">
				<h1 id="target-word-display"
					class="font-display text-5xl sm:text-6xl font-bold text-slate-800 tracking-wide my-2 text-center"></h1>

				<div id="syllables-helper" class="flex flex-wrap items-center justify-center gap-2 my-2"></div>

				<button id="btn-mic" class="btn-3d mic-btn" title="Toca para hablar">
					<span id="mic-icon">🎤</span>
				</button>

				<a id="btn-parent-approve" href="#"
					class="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 underline decoration-slate-300 transition-colors">
					¿Lo dijo bien? Avanzar →
				</a>
			</section>

			<!-- Sección Modo B: Escucho y Armo -->
			<section id="section-mode-b" class="hidden w-full flex flex-col items-center mt-2">
				<div id="slots-container" class="slots-box"></div>

				<div id="tiles-pool" class="tiles-pool-box"></div>
			</section>

			<div id="feedback-banner"
				class="hidden w-full mt-3 px-4 py-2.5 rounded-2xl text-center font-extrabold text-sm transition-all"></div>

			<div class="w-full border-t border-slate-100 mt-5 pt-3 flex justify-end">
				<button id="btn-skip"
					class="text-xs font-extrabold text-slate-400 hover:text-slate-600 flex items-center gap-1 uppercase tracking-wider">
					<span id="skip-label">OTRA PALABRA</span>
					<span>⏭️</span>
				</button>
			</div>

			<!-- Modal Celebración Especial de Desbloqueo de Nivel -->
			<div id="unlock-modal"
				class="hidden fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
				<div class="bg-white rounded-[36px] max-w-sm w-full p-6 text-center shadow-2xl border-4 border-amber-300 relative animate-popIn">
					<div class="text-6xl mb-2 animate-bounce">🏆🎉</div>
					<h3 class="font-display text-2xl sm:text-3xl font-bold text-amber-600 mb-2">
						¡NIVEL DESBLOQUEADO!
					</h3>
					<p class="text-slate-600 text-sm font-semibold mb-4">
						¡Increíble trabajo! Has alcanzado la meta requerida de estrellas y has desbloqueado el siguiente nivel de aventura.
					</p>

					<div class="flex flex-col gap-2">
						<button wire:click="returnToMenu"
							class="btn-3d w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm"
							style="--btn-shadow: #d97706; box-shadow: 0 4px 0 #d97706;">
							🚀 Ir al Menú de Niveles
						</button>
						<button onclick="document.getElementById('unlock-modal').classList.add('hidden')"
							class="text-xs font-bold text-slate-400 hover:text-slate-600 py-2">
							Seguir jugando en este nivel
						</button>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
