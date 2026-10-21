/* ==========================================================================
   1. BANCO DE PALABRAS (FALLBACK) Y DICCIONARIO FONÉTICO
   ========================================================================== */
const FALLBACK_WORD_BANK = [
	{ word: "mamá", emoji: "👩", syllables: ["ma", "má"], phonetic: "mamá" },
	{ word: "papá", emoji: "👨", syllables: ["pa", "pá"], phonetic: "papá" },
	{ word: "oso", emoji: "🐻", syllables: ["o", "so"], phonetic: "oso" },
	{ word: "sopa", emoji: "🍲", syllables: ["so", "pa"], phonetic: "sopa" },
	{ word: "luna", emoji: "🌙", syllables: ["lu", "na"], phonetic: "luna" },
	{ word: "gato", emoji: "🐱", syllables: ["ga", "to"], phonetic: "gato" },
	{ word: "pato", emoji: "🦆", syllables: ["pa", "to"], phonetic: "pato" },
	{ word: "casa", emoji: "🏠", syllables: ["ca", "sa"], phonetic: "casa" },
	{ word: "mesa", emoji: "🪑", syllables: ["me", "sa"], phonetic: "mesa" },
	{ word: "mano", emoji: "✋", syllables: ["ma", "no"], phonetic: "mano" },
	{ word: "pelo", emoji: "💇‍♀️", syllables: ["pe", "lo"], phonetic: "pelo" },
	{ word: "sapo", emoji: "🐸", syllables: ["sa", "po"], phonetic: "sapo" },
	{ word: "puma", emoji: "🐆", syllables: ["pu", "ma"], phonetic: "puma" },
	{ word: "vaca", emoji: "🐮", syllables: ["va", "ca"], phonetic: "vaca" },
	{ word: "pera", emoji: "🍐", syllables: ["pe", "ra"], phonetic: "pera" },
	{ word: "uva", emoji: "🍇", syllables: ["u", "va"], phonetic: "uva" },
	{ word: "piña", emoji: "🍍", syllables: ["pi", "ña"], phonetic: "piña" },
	{ word: "mono", emoji: "🐵", syllables: ["mo", "no"], phonetic: "mono" },
	{ word: "bota", emoji: "🥾", syllables: ["bo", "ta"], phonetic: "bota" },
	{ word: "dado", emoji: "🎲", syllables: ["da", "do"], phonetic: "dado" },
	{ word: "dedo", emoji: "☝️", syllables: ["de", "do"], phonetic: "dedo" },
	{ word: "nido", emoji: "🪺", syllables: ["ni", "do"], phonetic: "nido" },
	{ word: "nube", emoji: "☁️", syllables: ["nu", "be"], phonetic: "nube" },
	{ word: "foca", emoji: "🦭", syllables: ["fo", "ca"], phonetic: "foca" },
	{ word: "lobo", emoji: "🐺", syllables: ["lo", "bo"], phonetic: "lobo" },
	{ word: "loro", emoji: "🦜", syllables: ["lo", "ro"], phonetic: "loro" },
	{ word: "toro", emoji: "🐂", syllables: ["to", "ro"], phonetic: "toro" },
	{ word: "mula", emoji: "🫏", syllables: ["mu", "la"], phonetic: "mula" },
	{ word: "cama", emoji: "🛏️", syllables: ["ca", "ma"], phonetic: "cama" },
	{ word: "cuna", emoji: "🍼", syllables: ["cu", "na"], phonetic: "cuna" },
	{ word: "foto", emoji: "📷", syllables: ["fo", "to"], phonetic: "foto" },
	{ word: "moto", emoji: "🏍️", syllables: ["mo", "to"], phonetic: "moto" },
	{ word: "vela", emoji: "🕯️", syllables: ["ve", "la"], phonetic: "vela" },
	{ word: "vaso", emoji: "🥛", syllables: ["va", "so"], phonetic: "vaso" },
	{ word: "mapa", emoji: "🗺️", syllables: ["ma", "pa"], phonetic: "mapa" },
	{ word: "boca", emoji: "👄", syllables: ["bo", "ca"], phonetic: "boca" },
	{ word: "codo", emoji: "💪", syllables: ["co", "do"], phonetic: "codo" },
	{ word: "lima", emoji: "🍋", syllables: ["li", "ma"], phonetic: "lima" },
	{ word: "rosa", emoji: "🌹", syllables: ["ro", "sa"], phonetic: "rosa" },
	{ word: "bola", emoji: "⚽", syllables: ["bo", "la"], phonetic: "bola" },
	{ word: "bote", emoji: "⛵", syllables: ["bo", "te"], phonetic: "bote" },
	{ word: "taza", emoji: "☕", syllables: ["ta", "za"], phonetic: "taza" },
	{ word: "jugo", emoji: "🧃", syllables: ["ju", "go"], phonetic: "jugo" },
	{ word: "lana", emoji: "🧶", syllables: ["la", "na"], phonetic: "lana" },
	{ word: "pala", emoji: "🪴", syllables: ["pa", "la"], phonetic: "pala" },
	{ word: "pino", emoji: "🌲", syllables: ["pi", "no"], phonetic: "pino" },
	{ word: "topo", emoji: "🦔", syllables: ["to", "po"], phonetic: "topo" },
	{ word: "leche", emoji: "🥛", syllables: ["le", "che"], phonetic: "leche" },
	{ word: "bebé", emoji: "👶", syllables: ["be", "bé"], phonetic: "bebé" },
	// Palabras de 3 sílabas simples (sin trabadas ni grupos consonánticos como 'tren')
	{ word: "tenedor", emoji: "🍴", syllables: ["te", "ne", "dor"], phonetic: "tenedor" },
	{ word: "tomate", emoji: "🍅", syllables: ["to", "ma", "te"], phonetic: "tomate" },
	{ word: "pelota", emoji: "⚽", syllables: ["pe", "lo", "ta"], phonetic: "pelota" },
	{ word: "maleta", emoji: "🧳", syllables: ["ma", "le", "ta"], phonetic: "maleta" },
	{ word: "camisa", emoji: "👕", syllables: ["ca", "mi", "sa"], phonetic: "camisa" },
	{ word: "zapato", emoji: "👞", syllables: ["za", "pa", "to"], phonetic: "zapato" },
	{ word: "paloma", emoji: "🕊️", syllables: ["pa", "lo", "ma"], phonetic: "paloma" },
	{ word: "corona", emoji: "👑", syllables: ["co", "ro", "na"], phonetic: "corona" },
	{ word: "payaso", emoji: "🤡", syllables: ["pa", "ya", "so"], phonetic: "payaso" },
	{ word: "galleta", emoji: "🍪", syllables: ["ga", "lle", "ta"], phonetic: "galleta" },
	{ word: "moneda", emoji: "🪙", syllables: ["mo", "ne", "da"], phonetic: "moneda" },
	{ word: "conejo", emoji: "🐰", syllables: ["co", "ne", "jo"], phonetic: "conejo" },
	{ word: "cometa", emoji: "🪁", syllables: ["co", "me", "ta"], phonetic: "cometa" },
	{ word: "botella", emoji: "🍾", syllables: ["bo", "te", "lla"], phonetic: "botella" },
	{ word: "gallina", emoji: "🐔", syllables: ["ga", "lli", "na"], phonetic: "gallina" },
	{ word: "cereza", emoji: "🍒", syllables: ["ce", "re", "za"], phonetic: "cereza" },
	{ word: "ballena", emoji: "🐋", syllables: ["ba", "lle", "na"], phonetic: "ballena" },
	{ word: "lechuga", emoji: "🥬", syllables: ["le", "chu", "ga"], phonetic: "lechuga" },
	{ word: "maceta", emoji: "🪴", syllables: ["ma", "ce", "ta"], phonetic: "maceta" },
	{ word: "camello", emoji: "🐫", syllables: ["ca", "me", "llo"], phonetic: "camello" },
	{ word: "gusano", emoji: "🐛", syllables: ["gu", "sa", "no"], phonetic: "gusano" },
	{ word: "tetera", emoji: "🫖", syllables: ["te", "te", "ra"], phonetic: "tetera" }
];

let activeWordsPool = [...FALLBACK_WORD_BANK];
let shuffledDeck = [];

function shuffleArray(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function updateWordsPool(words) {
	if (Array.isArray(words) && words.length > 0) {
		activeWordsPool = words.map(w => ({
			word: String(w.word || "").toLowerCase(),
			emoji: w.emoji || "⭐",
			syllables: Array.isArray(w.syllables) ? w.syllables.map(s => String(s).toLowerCase()) : [String(w.word || "").toLowerCase()],
			phonetic: w.phonetic || String(w.word || "").toLowerCase()
		}));
		shuffledDeck = shuffleArray(activeWordsPool);
	}
}

/* Diccionario fonético seguro para evitar que el navegador lea sílabas
   como siglas ("SA", "SO"), elementos químicos ("NA" -> Sodio) o deletree
   letras individuales con tilde ("RRO" -> "ERRE ERRE O CON ACENTO AGUDO") */
const SYLLABLE_PHONETIC_MAP = {
	// Vocales aisladas (sin tilde para evitar que el TTS diga "A con acento")
	"a": "a", "e": "e", "i": "i", "o": "o", "u": "u",

	// Sílabas con M
	"ma": "ma", "me": "me", "mi": "mi", "mo": "mo", "mu": "mu", "má": "má",

	// Sílabas con P
	"pa": "pa", "pe": "pe", "pi": "pi", "po": "po", "pu": "pu", "pá": "pá",

	// Sílabas con S (sa -> sá previene lectura de sigla 'S.A.', so -> so evita deletreo 'SÓ')
	"sa": "sá", "se": "se", "si": "sí", "so": "so", "su": "su",

	// Sílabas con L (lo -> lo evita deletreo de 'LÓ')
	"la": "la", "le": "le", "li": "li", "lo": "lo", "lu": "lu",

	// Sílabas con N (na -> na sin tilde; 'ná' inducía sonido palatalizado 'ÑA' en el TTS)
	"na": "na", "ne": "ne", "ni": "ni", "no": "no", "nu": "nu",

	// Sílabas con T (to -> to evita deletreo de 'TÓ')
	"ta": "ta", "te": "te", "ti": "ti", "to": "to", "tu": "tu",

	// Sílabas con D (do -> do evita deletreo de 'DÓ')
	"da": "da", "de": "de", "di": "di", "do": "do", "du": "du",

	// Sílabas con C (fuerte -> k para evitar que el TTS las lea como siglas: CA->California, CO->Colombia/Company, CU->see you)
	"ca": "ka", "co": "ko", "cu": "ku", "cán": "kán", "car": "kar", "cam": "kam", "cua": "kua",

	// Sílabas con V y B (ve/be -> ve evita lectura de 'bé' como letra 'b con acento')
	"va": "va", "ve": "ve", "vi": "vi", "vo": "bo", "vu": "bu",
	"ba": "ba", "be": "ve", "bi": "bi", "bo": "bo", "bu": "bu",

	// Sílabas con G (go -> go evita deletreo de 'GÓ')
	"ga": "ga", "ge": "je", "gi": "ji", "go": "go", "gu": "gu", "gue": "ge", "gui": "gi",

	// Sílabas con R (fuerte / inicial):
	"ra": "ra", "re": "re", "ri": "ri", "ro": "ro", "ru": "ru",
	"rra": "ra", "rre": "re", "rri": "ri", "rro": "ro", "rru": "ru",

	// Sílabas con Ñ (ño -> ño evita deletreo de 'ñó')
	"ña": "ña", "ñe": "ñe", "ñi": "ñi", "ño": "ño", "ñu": "ñu",

	// Sílabas con F (fo -> fo evita deletreo de 'fó')
	"fa": "fa", "fe": "fe", "fi": "fi", "fo": "fo", "fu": "fu",

	// Sílabas con J (ja -> já evita deletreo 'JOTA A' como sigla en Chrome/Windows TTS)
	"ja": "já", "je": "je", "ji": "ji", "jo": "jo", "ju": "ju",

	// Sílabas con K
	"ka": "ka", "ke": "ke", "ki": "ki", "ko": "ko", "ku": "ku",

	// Sílabas con Q
	"que": "ke", "qui": "ki",

	// Sílabas con H
	"ha": "a", "he": "e", "hi": "i", "ho": "o", "hu": "u", "hue": "ue",

	// Sílabas con W (we -> güe evita que el TTS lo confunda con el pronombre en inglés 'we' /wi/)
	"wa": "gua", "we": "güe", "wi": "güi", "wo": "guo", "wu": "gu",

	// Sílabas con X
	"xa": "xa", "xe": "xe", "xi": "xi", "xo": "xo", "xu": "xu",

	// Sílabas con Z y C suave
	"za": "za", "ze": "ce", "zi": "sí", "zo": "zo", "zu": "zu", "ce": "ce", "ci": "sí",

	// Sílabas con CH
	"cha": "cha", "che": "che", "chi": "chi", "cho": "cho", "chu": "chu",

	// Sílabas con LL y Y (conservar ll natural sin forzar a 'y' para no inducir sheísmo)
	"lla": "lla", "lle": "lle", "lli": "lli", "llo": "llo", "llu": "llu",
	"ya": "ya", "ye": "ye", "yi": "yi", "yo": "yo", "yu": "yu",

	// Sílabas acentuadas o con coda de Nivel 2 (evita lectura de 'A con acento' o 'I con acento')
	"bé": "be", "bú": "bu", "dí": "di", "fá": "fa", "fín": "fin", "lá": "la",
	"má": "ma", "món": "món", "ní": "ni", "pá": "pa", "ré": "re", "rí": "ri",
	"rón": "rón", "tín": "tin", "tón": "tón", "ár": "ar", "íz": "is", "zza": "sa",
	"rroz": "ros", "vión": "bión", "mión": "mión", "dor": "dor"
};

const LETTER_PHONETIC_MAP = {
	"a": "a", "á": "a", "b": "be", "c": "ce", "d": "de", "e": "e", "é": "e",
	"f": "efe", "g": "ge", "h": "hache", "i": "i", "í": "i", "j": "jota",
	"k": "ka", "l": "ele", "m": "eme", "n": "ene", "ñ": "eñe",
	"o": "o", "ó": "o", "p": "pe", "q": "cu", "r": "erre", "s": "ese",
	"t": "te", "u": "u", "ú": "u", "v": "uve", "w": "doble uve",
	"x": "equis", "y": "ye", "z": "zeta"
};

const DISTRACTOR_SYLLABLES = ["ma", "pa", "so", "lu", "te", "ca", "no", "mi", "la", "to", "pe", "sa"];
const DISTRACTOR_LETTERS = ["m", "p", "s", "l", "t", "a", "e", "o", "u", "n", "c", "r"];

/* ==========================================================================
   2. ESTADO GLOBAL DE LA APLICACIÓN
   ========================================================================== */
const state = {
	stars: 0,
	targetStars: 100,
	currentLevel: 1,
	isUppercase: true,        // MAYÚSCULAS por defecto
	unitMode: "syllables",    // "syllables" por defecto ("letters" opcional)
	gameModeFilter: "random", // "random" | "speak" | "build"
	currentMode: "speak",     // "speak" (Modo A) | "build" (Modo B)
	currentWordObj: null,
	lastWordIndex: -1,
	targetUnits: [],
	placedUnits: [],
	tilePool: [],
	isListening: false,
	isTransitioning: false,
	slowTimers: [],
	transitionTimers: []
};

function clearTransitionTimers() {
	if (Array.isArray(state.transitionTimers)) {
		state.transitionTimers.forEach(t => clearTimeout(t));
		state.transitionTimers = [];
	}
}

/* ==========================================================================
   3. EFECTOS DE SONIDO (WEB AUDIO API NATIVO)
   ========================================================================== */
const SoundFX = {
	ctx: null,
	init() {
		if (!this.ctx) {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (AudioCtx) this.ctx = new AudioCtx();
		}
		if (this.ctx && this.ctx.state === "suspended") {
			this.ctx.resume();
		}
	},
	playTone(freq, type = "sine", duration = 0.14, delay = 0, vol = 0.14) {
		try {
			this.init();
			if (!this.ctx) return;
			const start = this.ctx.currentTime + delay;
			const osc = this.ctx.createOscillator();
			const gain = this.ctx.createGain();
			osc.type = type;
			osc.frequency.setValueAtTime(freq, start);
			gain.gain.setValueAtTime(vol, start);
			gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
			osc.connect(gain);
			gain.connect(this.ctx.destination);
			osc.start(start);
			osc.stop(start + duration);
		} catch (e) { }
	},
	pop() {
		this.playTone(540, "sine", 0.09, 0, 0.14);
	},
	nudge() {
		this.playTone(300, "triangle", 0.14, 0, 0.11);
		this.playTone(250, "triangle", 0.18, 0.11, 0.11);
	},
	fanfare() {
		const notes = [523.25, 659.25, 783.99, 1046.5];
		notes.forEach((n, idx) => {
			this.playTone(n, "triangle", 0.2, idx * 0.08, 0.16);
		});
	}
};

/* ==========================================================================
   4. MOTOR DE SÍNTESIS DE VOZ (TTS) CON PROTECCIÓN FONÉTICA
   ========================================================================== */
let selectedSpanishVoice = null;

function loadSpanishVoice() {
	if (!("speechSynthesis" in window)) return null;
	const voices = window.speechSynthesis.getVoices();
	if (!voices || !voices.length) return null;

	const allSpanish = voices.filter(v => (v.lang || "").toLowerCase().replace("_", "-").startsWith("es"));
	if (!allSpanish.length) return null;

	// Filtrar dialectos con yeísmo rehilado / sheísmo (Argentina, Uruguay) que pronuncian 'll' y 'y' como 'sh' ("sho", "anisho")
	const isNotRioplatense = (v) => {
		const lang = (v.lang || "").toLowerCase().replace("_", "-");
		const name = (v.name || "").toLowerCase();
		return !lang.includes("-ar") && !lang.includes("-uy") && !name.includes("argentina") && !name.includes("elena") && !name.includes("tomas");
	};

	const neutralVoices = allSpanish.filter(isNotRioplatense);
	const pool = neutralVoices.length > 0 ? neutralVoices : allSpanish;

	// Prioridad de voces naturales y neutrales (México, Perú, Colombia, EE.UU., España):
	selectedSpanishVoice =
		pool.find(v => (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Online")) && (v.lang.includes("MX") || v.lang.includes("PE") || v.lang.includes("CO") || v.lang.includes("US") || v.lang.includes("ES"))) ||
		pool.find(v => v.name.includes("Dalia") || v.name.includes("Jorge") || v.name.includes("Sabina") || v.name.includes("Paulina") || v.name.includes("Helena") || v.name.includes("Alvaro") || v.name.includes("Elvira")) ||
		pool.find(v => v.lang.includes("MX") || v.lang.includes("PE") || v.lang.includes("CO") || v.lang.includes("US")) ||
		pool.find(v => v.lang.includes("ES")) ||
		pool[0] ||
		null;

	return selectedSpanishVoice;
}

if ("speechSynthesis" in window) {
	loadSpanishVoice();
	window.speechSynthesis.onvoiceschanged = () => {
		loadSpanishVoice();
	};
}

function clearSlowTimers() {
	state.slowTimers.forEach(t => clearTimeout(t));
	state.slowTimers = [];
}

function toSafeSyllablePhonetic(syllable) {
	const clean = String(syllable || "").trim().toLowerCase();
	if (SYLLABLE_PHONETIC_MAP[clean]) {
		return SYLLABLE_PHONETIC_MAP[clean];
	}
	// Protección para dígrafos que no existen al inicio de palabra en español
	if (clean.startsWith("rr")) {
		return clean.replace(/^rr/, "r");
	}
	return clean;
}

function toSafeLetterPhonetic(letter) {
	const clean = String(letter || "").trim().toLowerCase();
	return LETTER_PHONETIC_MAP[clean] || clean;
}

function updateLevelBadge() {
	const levelBadge = document.getElementById("level-name-badge");
	if (!levelBadge) return;
	levelBadge.textContent = `Nivel ${state.currentLevel}`;
	if (state.currentLevel === 1) {
		levelBadge.className = "text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full";
	} else if (state.currentLevel === 2) {
		levelBadge.className = "text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full";
	} else if (state.currentLevel === 3) {
		levelBadge.className = "text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full";
	} else {
		levelBadge.className = "text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full";
	}
}

function speakText(text, rate = 0.9) {
	if (!("speechSynthesis" in window)) return;
	try {
		if (window.speechSynthesis.paused) {
			window.speechSynthesis.resume();
		}
		window.speechSynthesis.cancel();
		let safeLowerText = String(text || "").toLowerCase().trim();
		if (!safeLowerText) return;

		// Si el texto a hablar es una sílaba aislada en el mapa fonético seguro, aplicarlo automáticamente
		const cleanCandidate = safeLowerText.replace(/[¡!¿?.,;:]/g, "").trim();
		if (SYLLABLE_PHONETIC_MAP[cleanCandidate]) {
			safeLowerText = safeLowerText.replace(cleanCandidate, SYLLABLE_PHONETIC_MAP[cleanCandidate]);
		}

		// Si aún no se ha obtenido la voz o el navegador la cargó de forma diferida, buscarla
		if (!selectedSpanishVoice) {
			loadSpanishVoice();
		}

		const utter = new SpeechSynthesisUtterance(safeLowerText);
		if (selectedSpanishVoice) {
			utter.voice = selectedSpanishVoice;
			utter.lang = selectedSpanishVoice.lang;
		} else {
			utter.lang = "es-MX";
		}
		utter.rate = rate;
		utter.pitch = 1.05;
		window.speechSynthesis.speak(utter);
	} catch (e) { }
}

/* ==========================================================================
   4.1 REPRODUCTOR HÍBRIDO DE SÍLABAS (AUDIO LOCAL FIRST + FALLBACK TTS)
   ========================================================================== */
const SyllableAudioPlayer = {
	manifest: new Set(),
	audioCache: new Map(),
	currentAudio: null,
	isLoaded: false,

	async init() {
		try {
			const res = await fetch("/audio/syllables/manifest.json?v=" + Date.now());
			if (res.ok) {
				const list = await res.json();
				if (Array.isArray(list)) {
					this.manifest = new Set(list.map(s => String(s).toLowerCase().trim()));
					this.isLoaded = true;
				}
			}
		} catch (e) {
			console.warn("Manifiesto de audios de sílabas no disponible, usando fallback TTS:", e);
		}
	},

	slugify(syllable) {
		return String(syllable || "")
			.toLowerCase()
			.replace(/[áàä]/g, "a")
			.replace(/[éèë]/g, "e")
			.replace(/[íìï]/g, "i")
			.replace(/[óòö]/g, "o")
			.replace(/[úùü]/g, "u")
			.replace(/[^a-z0-9ñ]/g, "")
			.trim();
	},

	stop() {
		if (this.currentAudio) {
			try {
				this.currentAudio.pause();
				this.currentAudio.currentTime = 0;
			} catch (e) {}
			this.currentAudio = null;
		}
	},

	play(syllable, rate = 0.9, onEnd = null) {
		this.stop();
		if ("speechSynthesis" in window) {
			window.speechSynthesis.cancel();
		}

		const slug = this.slugify(syllable);

		// 1. Si el archivo local existe en el manifiesto, reproducir MP3 local
		if (this.manifest.has(slug)) {
			try {
				let audio = this.audioCache.get(slug);
				if (!audio) {
					audio = new Audio(`/audio/syllables/${slug}.mp3`);
					this.audioCache.set(slug, audio);
				}
				audio.currentTime = 0;
				audio.playbackRate = 1.0;
				this.currentAudio = audio;

				if (onEnd) {
					audio.onended = () => {
						audio.onended = null;
						onEnd();
					};
				}

				const playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.catch(() => {
						// Fallback a TTS si el navegador bloquea autoplay o falla la carga
						speakText(toSafeSyllablePhonetic(syllable), rate);
						if (onEnd) setTimeout(onEnd, 600);
					});
				}
				return;
			} catch (err) {
				console.warn("Fallo reproducción MP3 de sílaba, aplicando fallback TTS:", err);
			}
		}

		// 2. Fallback transparente a TTS si no existe el archivo MP3
		speakText(toSafeSyllablePhonetic(syllable), rate);
		if (onEnd) setTimeout(onEnd, 650);
	}
};

// Reproduce las sílabas lentamente una por una SIN repetir la palabra completa al final
function speakSlowSyllables() {
	if (!state.currentWordObj) return;
	clearSlowTimers();
	SyllableAudioPlayer.stop();
	if ("speechSynthesis" in window) window.speechSynthesis.cancel();

	const spokenSyllables = state.currentWordObj.syllables.filter(s => s.trim() !== "");
	const stepDelay = 680;

	spokenSyllables.forEach((syl, idx) => {
		const timerId = setTimeout(() => {
			SyllableAudioPlayer.play(syl, 0.82);
		}, idx * stepDelay);
		state.slowTimers.push(timerId);
	});
}

/* ==========================================================================
   5. UTILIDADES DE FORMATO, COMPARACIÓN FONÉTICA Y CONFETI ULTRARRÁPIDO
   ========================================================================== */
function formatTextCase(str) {
	if (!str) return "";
	return state.isUppercase ? str.toUpperCase() : str.toLowerCase();
}

function normalizeString(str) {
	return String(str || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9ñ\s]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

// Normaliza equivalencias fonéticas del español (b/v, s/c/z, ll/y, h muda)
function toSpanishPhoneticKey(str) {
	return normalizeString(str)
		.replace(/\s+/g, "")
		.replace(/h/g, "")
		.replace(/v/g, "b")
		.replace(/ll/g, "y")
		.replace(/ce/g, "se")
		.replace(/ci/g, "si")
		.replace(/z/g, "s")
		.replace(/qu/g, "k")
		.replace(/ca/g, "ka")
		.replace(/co/g, "ko")
		.replace(/cu/g, "ku");
}

function levenshteinDistance(a, b) {
	const m = a.length;
	const n = b.length;
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
	for (let i = 0; i <= m; i++) dp[i][0] = i;
	for (let j = 0; j <= n; j++) dp[0][j] = j;

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,
				dp[i][j - 1] + 1,
				dp[i - 1][j - 1] + cost
			);
		}
	}
	return dp[m][n];
}

function fireQuickConfetti() {
	if (typeof confetti === "function") {
		confetti.reset();
		confetti({
			particleCount: 45,
			spread: 70,
			origin: { y: 0.6 },
			ticks: 55,
			gravity: 2.4,
			decay: 0.91,
			scalar: 0.95,
			disableForReducedMotion: true
		});
	}
}

function stopConfettiImmediately() {
	if (typeof confetti === "function") {
		confetti.reset();
	}
}

/* ==========================================================================
   6. GENERACIÓN DE EJERCICIOS Y RENDERIZADO
   ========================================================================== */
function pickRandomWord() {
	const sourcePool = activeWordsPool.length > 0 ? activeWordsPool : FALLBACK_WORD_BANK;
	if (!shuffledDeck || shuffledDeck.length === 0) {
		shuffledDeck = shuffleArray(sourcePool);
	}
	const picked = shuffledDeck.pop();
	// Si hay más de 1 palabra en el mazo, evitar repetir inmediatamente la misma palabra consecutiva
	if (sourcePool.length > 1 && state.currentWordObj && picked.word === state.currentWordObj.word && shuffledDeck.length > 0) {
		const alternative = shuffledDeck.pop();
		shuffledDeck.push(picked);
		return alternative;
	}
	return picked;
}

function showFeedback(message, type = "info") {
	const banner = document.getElementById("feedback-banner");
	if (!banner) return;
	banner.classList.remove("hidden", "bg-amber-100", "text-amber-800", "bg-rose-100", "text-rose-800", "bg-emerald-100", "text-emerald-800");

	if (type === "warn") {
		banner.classList.add("bg-amber-100", "text-amber-800");
	} else if (type === "success") {
		banner.classList.add("bg-emerald-100", "text-emerald-800");
	} else {
		banner.classList.add("bg-rose-100", "text-rose-800");
	}
	banner.textContent = message;
}

function hideFeedback() {
	const banner = document.getElementById("feedback-banner");
	if (banner) banner.classList.add("hidden");
}

function nextExercise() {
	clearTransitionTimers();
	state.isTransitioning = false;
	stopConfettiImmediately();
	clearSlowTimers();
	SyllableAudioPlayer.stop();
	stopMicrophone();
	hideFeedback();

	state.currentWordObj = pickRandomWord();

	if (state.gameModeFilter === "random") {
		state.currentMode = Math.random() < 0.5 ? "speak" : "build";
	} else {
		state.currentMode = state.gameModeFilter;
	}

	renderCurrentExercise();
}

function getConsonantPrefix(rawWord) {
	const w = String(rawWord || "").toUpperCase();
	if (w.startsWith("CH")) return "CH";
	if (w.startsWith("LL")) return "LL";
	if (w.startsWith("QU")) return "QU";
	if (w.startsWith("GU") && (w === "GUE" || w === "GUI")) return "GU";
	return w.charAt(0);
}

function renderSyllablesDiscrimination() {
	const grid = document.getElementById("syllables-grid");
	if (!grid || !state.currentWordObj) return;

	grid.innerHTML = "";

	const targetWord = state.currentWordObj.word.toUpperCase();
	const prefix = getConsonantPrefix(targetWord);

	// 1. Distractores de la misma familia consonántica
	const sameFamily = activeWordsPool
		.filter(w => {
			const itemWord = String(w.word || "").toUpperCase();
			return itemWord !== targetWord && getConsonantPrefix(itemWord) === prefix;
		})
		.map(w => String(w.word || "").toUpperCase());

	const shuffledFamily = shuffleArray(sameFamily);
	const pickedDistractors = shuffledFamily.slice(0, 3);

	// 2. Si la familia tiene menos de 3 (ej. QUE y QUI), rellenar con otras sílabas
	if (pickedDistractors.length < 3) {
		const otherPool = activeWordsPool
			.filter(w => {
				const itemWord = String(w.word || "").toUpperCase();
				return itemWord !== targetWord && !pickedDistractors.includes(itemWord);
			})
			.map(w => String(w.word || "").toUpperCase());
		const shuffledOther = shuffleArray(otherPool);
		while (pickedDistractors.length < 3 && shuffledOther.length > 0) {
			pickedDistractors.push(shuffledOther.pop());
		}
	}

	// 3. Crear el mazo de 4 opciones y barajarlo
	const options = shuffleArray([targetWord, ...pickedDistractors]);

	// 4. Renderizar las tarjetas de texto puro
	options.forEach(optWord => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "syllable-card-btn btn-3d";
		btn.dataset.syllable = optWord;
		btn.textContent = formatTextCase(optWord);

		btn.addEventListener("click", () => {
			if (state.isTransitioning) return;

			if (optWord === targetWord) {
				btn.classList.add("correct");
				SoundFX.pop();
				SyllableAudioPlayer.play(optWord, 0.95);
				triggerSuccess();
			} else {
				btn.classList.add("wrong");
				SoundFX.nudge();
				// Re-pronunciar la sílaba buscada para reforzar al niño
				setTimeout(() => {
					SyllableAudioPlayer.play(targetWord, 0.88);
				}, 150);
			}
		});

		grid.appendChild(btn);
	});

	// 5. Reproducir automáticamente la sílaba objetivo en Nivel 1
	setTimeout(() => {
		if (state.currentLevel === 1 && state.currentWordObj) {
			SyllableAudioPlayer.play(targetWord, 0.9);
		}
	}, 180);
}

function renderCurrentExercise() {
	if (!state.currentWordObj) return;

	updateLevelBadge();

	const badge = document.getElementById("mode-badge");
	const emojiBtn = document.getElementById("emoji-btn");
	const audioRow = document.getElementById("audio-controls-row");
	const sectionA = document.getElementById("section-mode-a");
	const sectionB = document.getElementById("section-mode-b");
	const sectionSyllables = document.getElementById("section-syllables");
	const btnToggleMode = document.getElementById("btn-toggle-mode");
	const badgeLevel1Mode = document.getElementById("badge-level1-mode");
	const skipLabel = document.getElementById("skip-label");

	// ==========================================================
	// CASO A: NIVEL 1 - SILABARIO (DISCRIMINACIÓN DE SÍLABAS)
	// ==========================================================
	if (state.currentLevel === 1) {
		if (btnToggleMode) btnToggleMode.classList.add("hidden");
		if (badgeLevel1Mode) badgeLevel1Mode.classList.remove("hidden");
		if (skipLabel) skipLabel.textContent = "OTRA SÍLABA";

		if (badge) {
			badge.textContent = "👂 ESCUCHO Y TOCO";
			badge.className = "px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide bg-indigo-100 text-indigo-700";
		}

		if (emojiBtn) emojiBtn.classList.add("hidden");
		if (audioRow) audioRow.classList.add("hidden");
		if (sectionA) sectionA.classList.add("hidden");
		if (sectionB) sectionB.classList.add("hidden");
		if (sectionSyllables) sectionSyllables.classList.remove("hidden");

		renderSyllablesDiscrimination();
		return;
	}

	// ==========================================================
	// CASO B: NIVEL 2 EN ADELANTE - PALABRAS MÁGICAS
	// ==========================================================
	if (btnToggleMode) btnToggleMode.classList.remove("hidden");
	if (badgeLevel1Mode) badgeLevel1Mode.classList.add("hidden");
	if (skipLabel) skipLabel.textContent = "OTRA PALABRA";
	if (sectionSyllables) sectionSyllables.classList.add("hidden");
	if (emojiBtn) emojiBtn.classList.remove("hidden");

	const emojiEl = document.getElementById("word-emoji");
	const emojiSpeakerBadge = document.getElementById("emoji-speaker-badge");

	if (emojiEl) {
		emojiEl.classList.remove("emoji-reveal-anim");
	}

	if (state.currentMode === "speak") {
		// MODO A: LEO Y HABLO
		if (emojiEl) emojiEl.textContent = "❓";
		if (emojiBtn) {
			emojiBtn.classList.add("mystery");
			emojiBtn.style.cursor = "default";
		}
		if (badge) {
			badge.textContent = "🎤 LEO Y HABLO";
			badge.className = "px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide bg-rose-100 text-rose-700";
		}
		if (emojiSpeakerBadge) emojiSpeakerBadge.classList.add("hidden");
		if (audioRow) audioRow.classList.add("hidden");
		if (sectionA) sectionA.classList.remove("hidden");
		if (sectionB) sectionB.classList.add("hidden");

		renderModeA();
	} else {
		// MODO B: ESCUCHO Y ARMO
		if (badge) {
			badge.textContent = "🧩 ESCUCHO Y ARMO";
			badge.className = "px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide bg-indigo-100 text-indigo-700";
		}
		if (emojiEl) emojiEl.textContent = state.currentWordObj.emoji;
		if (emojiBtn) {
			emojiBtn.classList.remove("mystery");
			emojiBtn.style.cursor = "pointer";
		}
		if (emojiSpeakerBadge) emojiSpeakerBadge.classList.remove("hidden");
		if (audioRow) audioRow.classList.remove("hidden");
		if (sectionA) sectionA.classList.add("hidden");
		if (sectionB) sectionB.classList.remove("hidden");

		setupAndRenderModeB();
	}

	// En Nivel 2: auto-reproducir ÚNICAMENTE en Modo B ("Escucho y Armo").
	// En Modo A ("Leo y Hablo"), NUNCA debe auto-pronunciar la palabra al cargar
	// porque el objetivo pedagógico es que el niño lea la palabra por sí mismo antes de hablar al micrófono.
	if (state.currentLevel !== 1 && state.currentMode === "build") {
		setTimeout(() => {
			if (state.currentLevel !== 1 && state.currentWordObj && state.currentMode === "build") {
				speakText(state.currentWordObj.phonetic || state.currentWordObj.word, 0.9);
			}
		}, 180);
	}
}

/* ==========================================================================
   7. LÓGICA DEL MODO A: LEO Y HABLO (MICRÓFONO CON VALIDACIÓN PRECISA)
   ========================================================================== */
function renderModeA() {
	const wordDisplay = document.getElementById("target-word-display");
	const syllablesHelper = document.getElementById("syllables-helper");

	if (wordDisplay) {
		wordDisplay.textContent = formatTextCase(state.currentWordObj.word);
	}

	if (syllablesHelper) {
		syllablesHelper.innerHTML = "";
		state.currentWordObj.syllables.forEach(syl => {
			if (syl.trim() === "") {
				const sep = document.createElement("span");
				sep.className = "text-slate-300 font-bold px-1";
				sep.textContent = "•";
				syllablesHelper.appendChild(sep);
			} else {
				const chip = document.createElement("span");
				chip.className = "px-3.5 py-1.5 rounded-xl bg-amber-100 border-2 border-amber-300 text-amber-900 font-display font-bold text-lg";
				chip.textContent = formatTextCase(syl);
				syllablesHelper.appendChild(chip);
			}
		});
	}
}

let recognition = null;

function initSpeechRecognition() {
	const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
	if (!SpeechRec) return null;

	const rec = new SpeechRec();
	rec.lang = "es-ES";
	rec.continuous = false;
	rec.interimResults = false;
	rec.maxAlternatives = 5;

	rec.onstart = () => {
		state.isListening = true;
		const micBtn = document.getElementById("btn-mic");
		const statusText = document.getElementById("mic-status-text");
		if (micBtn) micBtn.classList.add("listening");
		if (statusText) statusText.textContent = "👂 ¡TE ESCUCHO! LEE LA PALABRA...";
		hideFeedback();
	};

	rec.onresult = (event) => {
		const transcripts = [];
		for (let i = 0; i < event.results[0].length; i++) {
			transcripts.push(event.results[0][i].transcript);
		}
		validateSpokenWord(transcripts);
	};

	rec.onerror = () => {
		stopMicrophone();
		showFeedback("¡No se entendió bien! Inténtalo otra vez 🌟", "warn");
	};

	rec.onend = () => {
		stopMicrophone();
	};

	return rec;
}

function stopMicrophone() {
	state.isListening = false;
	const micBtn = document.getElementById("btn-mic");
	const statusText = document.getElementById("mic-status-text");
	if (micBtn) micBtn.classList.remove("listening");
	if (statusText) statusText.textContent = "TOCA EL MICRÓFONO Y LEE EN VOZ ALTA";
	if (recognition) {
		try { recognition.abort(); } catch (e) { }
	}
}

function toggleMicrophone() {
	if (state.isTransitioning) return;
	SoundFX.pop();

	if (state.isListening) {
		stopMicrophone();
		return;
	}

	if (!recognition) {
		recognition = initSpeechRecognition();
	}

	if (!recognition) {
		showFeedback("Tu navegador no tiene micrófono activo. Usa el enlace de abajo para avanzar 🌟", "warn");
		return;
	}

	try {
		recognition.start();
	} catch (e) {
		stopMicrophone();
	}
}

/* Validación estricta contra diminutivos ("mamita", "perita", "osito")
   pero tolerante al silabeo infantil ("pe... ra", "so... pa") */
function isClosePronunciation(spokenRaw, wordObj) {
	const spokenNorm = normalizeString(spokenRaw);
	const targetNorm = normalizeString(wordObj.word);
	if (!spokenNorm || !targetNorm) return false;

	// 1. Coincidencia exacta directa (ej. "pera" === "pera")
	if (spokenNorm === targetNorm) return true;

	// 2. Rechazar diminutivos o palabras derivadas largas (ej. "mamita", "perita", "gatito", "solecito")
	const diminutiveRegex = /(ito|ita|itos|itas|cito|cita|citos|citas)$/;
	if (diminutiveRegex.test(spokenNorm) && !diminutiveRegex.test(targetNorm)) {
		return false;
	}

	// 3. Comparación uniendo sílabas separadas por pausas (ej. "pe ra" -> "pera", "la va ca" -> "lavaca")
	const spokenJoined = spokenNorm.replace(/\s+/g, "");
	const targetJoined = targetNorm.replace(/\s+/g, "");
	if (spokenJoined === targetJoined) return true;

	// 4. Comparación por clave fonética española (acepta "baca" por "vaca" o "pe ra" con pausa)
	const spokenPhon = toSpanishPhoneticKey(spokenRaw);
	const targetPhon = toSpanishPhoneticKey(wordObj.word);
	if (spokenPhon === targetPhon) return true;

	// 5. Tolerancia a repetición de la primera sílaba al silabear (ej. "pe pera" o "so sopa")
	const firstSylPhon = toSpanishPhoneticKey(wordObj.syllables[0] || "");
	if (firstSylPhon && spokenPhon === (firstSylPhon + targetPhon)) {
		return true;
	}

	// 6. Control estricto de longitud: si tiene más de 1 letra de diferencia, no es la palabra
	// (esto bloquea "perita" [6] vs "pera" [4], "mamita" [6] vs "mama" [4], "osito" [5] vs "oso" [3])
	if (Math.abs(spokenPhon.length - targetPhon.length) > 1) {
		return false;
	}

	// 7. Para palabras cortas (3 letras o menos como "sol", "pan", "mar", "oso", "uva"), exigir coincidencia exacta
	if (targetPhon.length <= 3) {
		return false;
	}

	// 8. Para palabras de 4 o más letras, permitir máximo 1 letra de distancia de edición (Levenshtein === 1)
	// siempre que coincida la vocal final para no aceptar palabras distintas
	const dist = levenshteinDistance(spokenPhon, targetPhon);
	const sameEnding = spokenPhon[spokenPhon.length - 1] === targetPhon[targetPhon.length - 1];
	return dist <= 1 && sameEnding;
}

function validateSpokenWord(transcripts) {
	if (!state.currentWordObj) return;

	const matched = transcripts.some(t => isClosePronunciation(t, state.currentWordObj));

	if (matched) {
		triggerSuccess();
	} else {
		SoundFX.nudge();
		showFeedback("¡No se entendió bien! Inténtalo otra vez 🌟", "warn");
	}
}

/* ==========================================================================
   8. LÓGICA DEL MODO B: ESCUCHO Y ARMO (FICHAS)
   ========================================================================== */
function setupAndRenderModeB() {
	if (!state.currentWordObj) return;

	const rawUnits = [];
	if (state.unitMode === "syllables") {
		state.currentWordObj.syllables.forEach(s => {
			if (s.trim() === "") {
				rawUnits.push({ value: " ", isSpace: true });
			} else {
				rawUnits.push({ value: s, isSpace: false });
			}
		});
	} else {
		Array.from(state.currentWordObj.word).forEach(ch => {
			if (ch === " ") {
				rawUnits.push({ value: " ", isSpace: true });
			} else {
				rawUnits.push({ value: ch, isSpace: false });
			}
		});
	}

	state.targetUnits = rawUnits;
	state.placedUnits = [];

	const playableValues = rawUnits.filter(u => !u.isSpace).map(u => u.value);

	const distractorSource = state.unitMode === "syllables" ? DISTRACTOR_SYLLABLES : DISTRACTOR_LETTERS;
	const lowerPlayable = playableValues.map(v => v.toLowerCase());
	const availableDistractors = distractorSource.filter(d => !lowerPlayable.includes(d.toLowerCase()));

	const shuffledDistractors = [...availableDistractors].sort(() => Math.random() - 0.5).slice(0, 3);
	const combined = [...playableValues, ...shuffledDistractors];

	state.tilePool = combined
		.map((val, idx) => ({ id: "tile-" + idx + "-" + Math.random().toString(36).slice(2, 6), value: val, used: false }))
		.sort(() => Math.random() - 0.5);

	renderModeBElements();
}

function renderModeBElements() {
	const slotsContainer = document.getElementById("slots-container");
	const tilesPool = document.getElementById("tiles-pool");
	if (!slotsContainer || !tilesPool) return;

	slotsContainer.innerHTML = "";
	tilesPool.innerHTML = "";

	let playableIdx = 0;

	state.targetUnits.forEach(unit => {
		if (unit.isSpace) {
			const dot = document.createElement("span");
			dot.className = "text-slate-300 font-bold text-2xl px-1 select-none";
			dot.textContent = "•";
			slotsContainer.appendChild(dot);
		} else {
			const currentPos = playableIdx;
			const placedTile = state.placedUnits[currentPos];
			const slotEl = document.createElement("div");

			if (placedTile) {
				slotEl.className = "slot-filled";
				slotEl.textContent = formatTextCase(placedTile.value);
				slotEl.title = "Toca para quitar";
				slotEl.addEventListener("click", () => removePlacedTileAt(currentPos));
			} else {
				slotEl.className = "slot-empty";
				slotEl.textContent = "?";
			}
			slotsContainer.appendChild(slotEl);
			playableIdx++;
		}
	});

	state.tilePool.forEach(tile => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "btn-3d tile-btn-3d" + (tile.used ? " used" : "");
		btn.textContent = formatTextCase(tile.value);
		btn.disabled = tile.used;
		btn.addEventListener("click", () => handleTileSelect(tile));
		tilesPool.appendChild(btn);
	});
}

function handleTileSelect(tile) {
	if (state.isTransitioning || tile.used) return;

	const playableTargets = state.targetUnits.filter(u => !u.isSpace);
	const nextIndex = state.placedUnits.length;
	if (nextIndex >= playableTargets.length) return;

	const expectedValue = playableTargets[nextIndex].value;

	if (state.unitMode === "syllables") {
		SyllableAudioPlayer.play(tile.value, 0.9);
	} else {
		speakText(toSafeLetterPhonetic(tile.value), 0.9);
	}

	if (tile.value.toLowerCase() === expectedValue.toLowerCase()) {
		SoundFX.pop();
		tile.used = true;
		state.placedUnits.push(tile);
		hideFeedback();
		renderModeBElements();

		if (state.placedUnits.length === playableTargets.length) {
			triggerSuccess();
		}
	} else {
		SoundFX.nudge();
		showFeedback("¡Casi! Intenta con otra ficha 🌟", "warn");
	}
}

function removePlacedTileAt(index) {
	if (state.isTransitioning) return;
	const removed = state.placedUnits.splice(index);
	removed.forEach(t => { t.used = false; });
	SoundFX.pop();
	renderModeBElements();
}

/* ==========================================================================
   9. SINCRONIZACIÓN CON BASE DE DATOS Y CELEBRACIÓN
   ========================================================================== */
function getLivewireGameComponent() {
	if (typeof window.Livewire === "undefined") return null;

	// 1. Livewire.first() en Livewire 3/4 devuelve el proxy $wire del componente
	if (typeof window.Livewire.first === "function") {
		try {
			const first = window.Livewire.first();
			if (first) return first;
		} catch (e) {}
	}

	// 2. Livewire.all() devuelve array de componentes; cada componente tiene su .$wire
	if (typeof window.Livewire.all === "function") {
		try {
			const all = window.Livewire.all();
			if (all && all.length > 0 && all[0].$wire) {
				return all[0].$wire;
			}
		} catch (e) {}
	}

	// 3. Buscar elemento con atributo wire:id
	const rootEl = document.querySelector("[wire\\:id]");
	if (rootEl && typeof window.Livewire.find === "function") {
		try {
			const found = window.Livewire.find(rootEl.getAttribute("wire:id"));
			if (found) return found;
		} catch (e) {}
	}

	return null;
}

/* ==========================================================================
   9. ACTUALIZACIÓN Y ANIMACIÓN DE LA BARRA DE PROGRESO DENTRO DEL JUEGO
   ========================================================================== */
function updateGameProgressBar(stars, target = state.targetStars || 100, animate = true) {
	const fillEl = document.getElementById("game-progress-fill");
	const starsEl = document.getElementById("game-progress-stars");
	const targetEl = document.getElementById("game-progress-target");
	const starIconEl = document.getElementById("game-progress-star-icon");
	const floaterEl = document.getElementById("game-progress-floater");
	const shimmerEl = document.getElementById("game-progress-shimmer");

	const safeTarget = Math.max(1, target || 100);
	const percent = Math.min(100, Math.max(0, Math.round((stars / safeTarget) * 100)));

	if (starsEl) starsEl.textContent = String(stars);
	if (targetEl) targetEl.textContent = String(safeTarget);

	if (fillEl) {
		fillEl.style.width = `${percent}%`;
		if (state.currentLevel === 1) {
			fillEl.style.background = "linear-gradient(90deg, #818cf8 0%, #6366f1 100%)";
		} else if (state.currentLevel === 2) {
			fillEl.style.background = "linear-gradient(90deg, #34d399 0%, #10b981 100%)";
		} else if (state.currentLevel === 3) {
			fillEl.style.background = "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)";
		} else {
			fillEl.style.background = "linear-gradient(90deg, #fb7185 0%, #f43f5e 100%)";
		}
		if (percent === 0) {
			fillEl.classList.add("is-empty");
		} else {
			fillEl.classList.remove("is-empty");
		}
	}

	if (animate) {
		// 1. Pop y salto visual del número de estrellas
		if (starsEl) {
			starsEl.classList.remove("progress-number-pop");
			void starsEl.offsetWidth;
			starsEl.classList.add("progress-number-pop");
		}

		// 2. Giro y escala de la estrella
		if (starIconEl) {
			starIconEl.classList.remove("progress-star-spin");
			void starIconEl.offsetWidth;
			starIconEl.classList.add("progress-star-spin");
		}

		// 3. Brillo y pulso de avance en el relleno de la barra
		if (fillEl) {
			fillEl.classList.remove("progress-fill-advancing");
			void fillEl.offsetWidth;
			fillEl.classList.add("progress-fill-advancing");
		}

		// 4. Destello luminoso que recorre la barra
		if (shimmerEl) {
			shimmerEl.classList.remove("active-shimmer");
			void shimmerEl.offsetWidth;
			shimmerEl.classList.add("active-shimmer");
		}

		// 5. +1 ⭐ flotante que sube hacia arriba
		if (floaterEl) {
			floaterEl.classList.remove("progress-float-anim");
			void floaterEl.offsetWidth;
			floaterEl.classList.add("progress-float-anim");
		}
	}
}

function syncStarWithBackend(level = 1) {
	const wire = getLivewireGameComponent();
	if (!wire) {
		console.warn("Livewire no detectado aún en el cliente para registrar la estrella.");
		return;
	}

	try {
		const callPromise = typeof wire.recordStar === "function" 
			? wire.recordStar(level) 
			: (typeof wire.call === "function" ? wire.call("recordStar", level) : null);

		if (callPromise && typeof callPromise.then === "function") {
			callPromise.then(res => {
				if (res && typeof res.stars === "number") {
					state.stars = res.stars;
					const starEl = document.getElementById("star-count");
					if (starEl) starEl.textContent = String(res.stars);
					localStorage.setItem("aventura_letras_stars", String(res.stars));
					updateGameProgressBar(state.stars, state.targetStars || 100, false);
				}

				if (res && res.unlockedNextLevel) {
					setTimeout(() => {
						const unlockModal = document.getElementById("unlock-modal");
						if (unlockModal) unlockModal.classList.remove("hidden");
						if (typeof confetti === "function") {
							confetti({
								particleCount: 160,
								spread: 100,
								origin: { y: 0.55 }
							});
						}
					}, 1400);
				}
			}).catch(err => {
				console.error("Error al persistir estrella en base de datos:", err);
			});
		}
	} catch (err) {
		console.error("Excepción al llamar recordStar:", err);
	}
}

function triggerSuccess() {
	if (state.isTransitioning) return;
	state.isTransitioning = true;

	clearSlowTimers();
	clearTransitionTimers();
	if ("speechSynthesis" in window) window.speechSynthesis.cancel();

	state.stars += 1;
	localStorage.setItem("aventura_letras_stars", String(state.stars));
	const starEl = document.getElementById("star-count");
	if (starEl) starEl.textContent = String(state.stars);

	// Actualizar barra de progreso adentro del juego con animación de avance
	updateGameProgressBar(state.stars, state.targetStars || 100, true);

	// Sincronización en segundo plano con Livewire v4 y base de datos MySQL
	syncStarWithBackend(state.currentLevel || 1);

	// Si venía del modo de lectura (hablar) y hay emoji, revelarlo con animación
	const emojiEl = document.getElementById("word-emoji");
	const emojiBtn = document.getElementById("emoji-btn");

	if (state.currentLevel !== 1 && state.currentWordObj && state.currentWordObj.emoji && emojiEl) {
		emojiEl.textContent = state.currentWordObj.emoji;
		if (emojiBtn) emojiBtn.classList.remove("mystery");
		emojiEl.classList.remove("emoji-reveal-anim");
		// Forzar reflow para reiniciar la animación
		void emojiEl.offsetWidth;
		emojiEl.classList.add("emoji-reveal-anim");
	}

	SoundFX.fanfare();
	fireQuickConfetti();

	// Transición directa y fluida a la siguiente sílaba o palabra
	let delayBeforeNext = 800;
	if (state.currentLevel === 1) {
		delayBeforeNext = 750;
	} else if (state.currentMode === "speak") {
		delayBeforeNext = 1200;
	}

	const t1 = setTimeout(() => {
		nextExercise();
	}, delayBeforeNext);

	state.transitionTimers.push(t1);
}

/* ==========================================================================
   10. EVENTOS DE INTERFAZ E INICIALIZACIÓN
   ========================================================================== */
function updateModeButtonsUI() {
	const btnToggleMode = document.getElementById("btn-toggle-mode");
	const iconEl = document.getElementById("mode-toggle-icon");
	const labelEl = document.getElementById("mode-toggle-label");

	const modeConfigs = {
		random: { icon: "🎲", label: "Aleatorio", classNames: "bg-indigo-100 text-indigo-800 border-indigo-300", shadow: "#818cf8" },
		speak: { icon: "🎤", label: "Hablar", classNames: "bg-rose-100 text-rose-800 border-rose-300", shadow: "#fb7185" },
		build: { icon: "🔤", label: "Armar", classNames: "bg-sky-100 text-sky-800 border-sky-300", shadow: "#38bdf8" }
	};

	const currentCfg = modeConfigs[state.gameModeFilter] || modeConfigs.random;
	if (iconEl) iconEl.textContent = currentCfg.icon;
	if (labelEl) labelEl.textContent = currentCfg.label;

	if (btnToggleMode) {
		btnToggleMode.className = `btn-3d btn-pill ${currentCfg.classNames}`;
		btnToggleMode.style.setProperty("--btn-shadow", currentCfg.shadow);
		btnToggleMode.style.boxShadow = `0 3px 0 ${currentCfg.shadow}`;
	}
}

window.addEventListener("DOMContentLoaded", () => {
	SyllableAudioPlayer.init();
	const gameArena = document.getElementById("game-arena");

	// 1. Leer nivel, metas y estrellas inyectadas por el servidor en dataset
	if (gameArena) {
		if (gameArena.dataset.level) {
			state.currentLevel = parseInt(gameArena.dataset.level, 10) || 1;
		}
		if (gameArena.dataset.target) {
			const targetFromAttr = parseInt(gameArena.dataset.target, 10);
			if (!isNaN(targetFromAttr) && targetFromAttr > 0) {
				state.targetStars = targetFromAttr;
			}
		}
		if (gameArena.dataset.stars !== undefined && gameArena.dataset.stars !== "") {
			const starsFromAttr = parseInt(gameArena.dataset.stars, 10);
			if (!isNaN(starsFromAttr)) {
				state.stars = starsFromAttr;
				localStorage.setItem("aventura_letras_stars", String(state.stars));
			}
		}
		if (gameArena.dataset.words) {
			try {
				const initialWords = JSON.parse(gameArena.dataset.words);
				if (Array.isArray(initialWords) && initialWords.length > 0) {
					updateWordsPool(initialWords);
				}
			} catch (e) {
				console.error("Error parseando data-words:", e);
			}
		}
	}

	updateLevelBadge();

	// 2. Fallbacks si state.stars es 0 (leer del HTML del progreso o localStorage)
	if (state.stars === 0) {
		const progressStarsEl = document.getElementById("game-progress-stars");
		if (progressStarsEl && progressStarsEl.textContent.trim()) {
			const parsed = parseInt(progressStarsEl.textContent.trim(), 10);
			if (!isNaN(parsed) && parsed > 0) {
				state.stars = parsed;
			}
		}
		if (state.stars === 0) {
			const saved = localStorage.getItem("aventura_letras_stars");
			if (saved !== null) {
				const parsedSaved = parseInt(saved, 10);
				state.stars = isNaN(parsedSaved) ? 0 : parsedSaved;
			}
		}
	}

	const starEl = document.getElementById("star-count");
	if (starEl) {
		starEl.textContent = String(state.stars);
	}

	// 3. Inicializar la barra de progreso dentro del juego con las estrellas reales
	updateGameProgressBar(state.stars, state.targetStars || 100, false);

	window.addEventListener("level-started", (event) => {
		const detail = event.detail?.[0] || event.detail || {};
		if (detail.level !== undefined) {
			state.currentLevel = parseInt(detail.level, 10) || 1;
		}
		updateLevelBadge();
		if (detail.target !== undefined) {
			state.targetStars = parseInt(detail.target, 10) || 100;
		}
		if (detail.stars !== undefined) {
			state.stars = parseInt(detail.stars, 10) || 0;
			const currentStarEl = document.getElementById("star-count");
			if (currentStarEl) currentStarEl.textContent = String(state.stars);
			localStorage.setItem("aventura_letras_stars", String(state.stars));
		}
		updateGameProgressBar(state.stars, state.targetStars || 100, false);
		if (Array.isArray(detail.words) && detail.words.length > 0) {
			updateWordsPool(detail.words);
		}
		nextExercise();
	});

	document.getElementById("btn-reset-stars")?.addEventListener("click", () => {
		state.stars = 0;
		localStorage.setItem("aventura_letras_stars", "0");
		if (starEl) starEl.textContent = "0";
		updateGameProgressBar(0, state.targetStars || 100, false);
		SoundFX.pop();
		const wire = getLivewireGameComponent();
		if (wire && typeof wire.resetStars === "function") {
			wire.resetStars(state.currentLevel || 1);
		}
	});

	document.getElementById("btn-toggle-case")?.addEventListener("click", () => {
		state.isUppercase = !state.isUppercase;
		const labelCaseDesktop = document.getElementById("label-case-desktop");
		const labelCaseMobile = document.getElementById("label-case-mobile");
		if (labelCaseDesktop) labelCaseDesktop.textContent = state.isUppercase ? "MAYÚSCULAS" : "minúsculas";
		if (labelCaseMobile) labelCaseMobile.textContent = state.isUppercase ? "MAY" : "min";
		SoundFX.pop();

		if (state.currentLevel === 1) {
			// Actualizar en vivo las tarjetas de sílabas sin recargar el ejercicio
			document.querySelectorAll(".syllable-card-btn").forEach(btn => {
				const syl = btn.dataset.syllable;
				if (syl) btn.textContent = formatTextCase(syl);
			});
		} else if (state.currentMode === "speak") {
			renderModeA();
		} else {
			renderModeBElements();
		}
	});

	// Nivel 1: Por defecto siempre sílabas. El botón está deshabilitado.

	const modesCycle = ["random", "speak", "build"];
	document.getElementById("btn-toggle-mode")?.addEventListener("click", () => {
		const nextIndex = (modesCycle.indexOf(state.gameModeFilter) + 1) % modesCycle.length;
		state.gameModeFilter = modesCycle[nextIndex];
		SoundFX.pop();
		updateModeButtonsUI();
		nextExercise();
	});
	updateModeButtonsUI();

	document.getElementById("btn-replay-syllable")?.addEventListener("click", () => {
		if (state.currentWordObj) {
			SoundFX.pop();
			SyllableAudioPlayer.play(state.currentWordObj.word, 0.9);
		}
	});

	document.getElementById("btn-listen-word")?.addEventListener("click", () => {
		if (state.currentWordObj) speakText(state.currentWordObj.phonetic, 0.9);
	});
	document.getElementById("btn-listen-slow")?.addEventListener("click", () => {
		speakSlowSyllables();
	});
	document.getElementById("emoji-btn")?.addEventListener("click", () => {
		if (state.currentMode === "build" && state.currentWordObj) {
			speakText(state.currentWordObj.phonetic, 0.9);
		}
	});

	document.getElementById("btn-mic")?.addEventListener("click", toggleMicrophone);
	document.getElementById("btn-parent-approve")?.addEventListener("click", (e) => {
		e.preventDefault();
		triggerSuccess();
	});

	document.getElementById("btn-skip")?.addEventListener("click", () => {
		SoundFX.pop();
		nextExercise();
	});

	// Solo iniciar automáticamente si el arena de juego está visible en pantalla (ej: recarga de página dentro del nivel)
	if (gameArena && !gameArena.classList.contains("hidden")) {
		nextExercise();
	}
});