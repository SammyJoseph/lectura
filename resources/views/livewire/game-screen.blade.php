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
					<div class="level-card {{ $data['is_unlocked'] ? 'unlocked border-2 border-amber-300' : 'locked' }}">
						<div>
							<!-- Encabezado de la tarjeta -->
							<div class="flex items-center justify-between mb-2">
								<span class="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full
									{{ $data['is_unlocked'] ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600' }}">
									@if ($data['is_unlocked'])
										⭐ NIVEL {{ $lvl }}
									@else
										🔒 NIVEL {{ $lvl }}
									@endif
								</span>

								@if ($data['is_unlocked'])
									<span class="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
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
								<div class="progress-bar-fill" style="width: {{ $percent }}%;"></div>
							</div>

							<!-- Botón de acción -->
							@if ($data['is_unlocked'])
								<button wire:click="selectLevel({{ $lvl }})"
									class="btn-3d w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2"
									style="--btn-shadow: #059669; box-shadow: 0 4px 0 #059669;">
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
	<div id="game-arena" class="w-full flex flex-col items-center {{ $activeLevel > 0 ? '' : 'hidden' }}" data-words="{{ json_encode($activeWords) }}" data-level="{{ $activeLevel }}">
		<header class="top-bar">
			<!-- Botón volver al Menú -->
			<button wire:click="returnToMenu" id="btn-return-menu"
				class="btn-3d btn-pill bg-sky-100 hover:bg-sky-200 text-sky-800 border-sky-300 font-extrabold text-sm"
				style="--btn-shadow: #38bdf8; box-shadow: 0 3px 0 #38bdf8;"
				title="Volver a elegir nivel">
				<span>🏠</span>
				<span class="font-display font-bold">Menú</span>
			</button>

			<!-- Contador de estrellas del nivel -->
			<div class="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl">
				<span class="text-xl">⭐</span>
				<span id="star-count" data-initial-stars="{{ $levels[1]['stars'] ?? 0 }}" class="font-display text-lg font-bold text-amber-900">
					{{ $levels[1]['stars'] ?? 0 }}
				</span>
			</div>

			<button id="btn-reset-stars" title="Reiniciar estrellas de este nivel"
				class="text-slate-400 hover:text-slate-600 text-sm px-1.5 py-1 rounded-lg">
				↻
			</button>

			<!-- Selector Mayúsculas / Minúsculas -->
			<button id="btn-toggle-case" class="btn-3d btn-pill bg-purple-100 text-purple-800 border-purple-300"
				style="--btn-shadow: #c084fc; box-shadow: 0 3px 0 #c084fc;" title="Cambiar MAYÚSCULAS / minúsculas">
				<span>🔤</span>
				<span id="label-case-desktop">MAYÚSCULAS</span>
				<span id="label-case-mobile">MAY</span>
			</button>

			<!-- Modo de juego: Aleatorio / Hablar / Armar -->
			<button id="btn-toggle-mode" class="btn-3d btn-pill bg-indigo-100 text-indigo-800 border-indigo-300"
				style="--btn-shadow: #818cf8; box-shadow: 0 3px 0 #818cf8;" title="Toca para cambiar modo">
				<span id="mode-toggle-icon">🎲</span>
				<span id="mode-toggle-label">Aleatorio</span>
			</button>

			<!-- Píldora del estudiante -->
			<div class="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-2xl shadow-sm text-xs font-bold text-slate-700">
				<span>{{ $studentAvatar }}</span>
				<span>{{ $studentName }}</span>
			</div>
		</header>

		<main class="game-card" wire:ignore>
			<div class="w-full flex items-center justify-between mb-1">
				<span id="mode-badge"
					class="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide bg-rose-100 text-rose-700">
					🎤 LEO Y HABLO
				</span>
				<span class="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
					{{ $levels[$activeLevel]['name'] ?? 'Nivel 1' }}
				</span>
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
					<span>LENTO</span>
				</button>
			</div>

			<!-- Sección Modo A: Leo y Hablo -->
			<section id="section-mode-a" class="w-full flex flex-col items-center">
				<h1 id="target-word-display"
					class="font-display text-5xl sm:text-6xl font-bold text-slate-800 tracking-wide my-2 text-center"></h1>

				<div id="syllables-helper" class="flex flex-wrap items-center justify-center gap-2 my-2"></div>

				<p class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mt-1 mb-2">
					LEE EN VOZ ALTA
				</p>

				<button id="btn-mic" class="btn-3d mic-btn" title="Toca para hablar">
					<span id="mic-icon">🎤</span>
				</button>

				<p id="mic-status-text"
					class="text-xs font-extrabold text-slate-600 uppercase tracking-wide mt-2 text-center">
					TOCA EL MICRÓFONO Y LEE EN VOZ ALTA
				</p>

				<a id="btn-parent-approve" href="#"
					class="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 underline decoration-slate-300 transition-colors">
					¿Lo dijo bien? Avanzar →
				</a>
			</section>

			<!-- Sección Modo B: Escucho y Armo -->
			<section id="section-mode-b" class="hidden w-full flex flex-col items-center mt-2">
				<p id="build-instruction"
					class="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2.5 text-center">
					TOCA LAS FICHAS EN ORDEN PARA ESCRIBIRLA
				</p>

				<div id="slots-container" class="slots-box"></div>

				<div id="tiles-pool" class="tiles-pool-box"></div>
			</section>

			<div id="feedback-banner"
				class="hidden w-full mt-3 px-4 py-2.5 rounded-2xl text-center font-extrabold text-sm transition-all"></div>

			<div class="w-full border-t border-slate-100 mt-5 pt-3 flex justify-end">
				<button id="btn-skip"
					class="text-xs font-extrabold text-slate-400 hover:text-slate-600 flex items-center gap-1 uppercase tracking-wider">
					<span>OTRA PALABRA</span>
					<span>⏭️</span>
				</button>
			</div>

			<!-- Overlay de Éxito Normal (+1 Estrella) -->
			<div id="success-overlay"
				class="hidden absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[32px] flex flex-col items-center justify-center z-20 p-6 text-center animate-popIn">
				<div id="success-emoji" class="text-7xl mb-2 animate-bounce">🌟</div>
				<h2 id="success-word" class="font-display text-4xl font-bold text-emerald-600 mb-2">¡MUY BIEN!</h2>
				<div
					class="inline-flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-4 py-1.5 rounded-full text-amber-800 font-extrabold text-base">
					<span>+1</span>
					<span>⭐</span>
				</div>
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
