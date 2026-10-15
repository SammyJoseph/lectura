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
	// Vocales aisladas
	"a": "á", "e": "é", "i": "í", "o": "o", "u": "ú",

	// Sílabas con M
	"ma": "ma", "me": "me", "mi": "mi", "mo": "mó", "mu": "mu", "má": "má",

	// Sílabas con P
	"pa": "pa", "pe": "pe", "pi": "pi", "po": "po", "pu": "pu", "pá": "pá",

	// Sílabas con S (sa -> sá previene lectura de sigla 'S.A.', so -> so evita deletreo 'SÓ')
	"sa": "sá", "se": "se", "si": "sí", "so": "so", "su": "su",

	// Sílabas con L (lo -> lo evita deletreo de 'LÓ')
	"la": "la", "le": "le", "li": "li", "lo": "lo", "lu": "lu",

	// Sílabas con N (na -> ná evita símbolo químico Na 'sodio' en voces como Sabina, no -> no)
	"na": "ná", "ne": "ne", "ni": "ni", "no": "no", "nu": "nu",

	// Sílabas con T (to -> to evita deletreo de 'TÓ')
	"ta": "ta", "te": "te", "ti": "ti", "to": "to", "tu": "tu",

	// Sílabas con D (do -> do evita deletreo de 'DÓ')
	"da": "da", "de": "de", "di": "di", "do": "do", "du": "du",

	// Sílabas con C (cu -> ku evita lectura en inglés 'see you')
	"ca": "ca", "co": "kó", "cu": "ku",

	// Sílabas con V y B (ve/be -> ve evita lectura de 'bé' como letra 'b con acento')
	"va": "va", "ve": "ve", "vi": "vi", "vo": "bo", "vu": "bu",
	"ba": "ba", "be": "ve", "bi": "bi", "bo": "bo", "bu": "bu",

	// Sílabas con G (go -> go evita deletreo de 'GÓ')
	"ga": "ga", "go": "go", "gu": "gu",

	// Sílabas con R (fuerte / inicial):
	// 'rro' y 'ro' se pronuncian 'rro' para que Sabina no lea 'row' en inglés y Google no deletree 'ERRE ERRE O CON ACENTO AGUDO'
	// 'ri' y 'rri' usan 'rí' para evitar 'R-I' en inglés
	// 'ru' y 'rru' usan 'rú' para evitar 'R-U' en inglés
	// 'ra' y 'rra' usan 'ra' para que Google no deletree 'erre erre a'
	// 're' y 'rre' usan 're' para que Google no deletree 'erre e con acento agudo'
	"ra": "ra", "re": "re", "ri": "rí", "ro": "rro", "ru": "rú",
	"rra": "ra", "rre": "re", "rri": "rí", "rro": "rro", "rru": "rú",

	// Sílabas con Ñ (ño -> ño evita deletreo de 'ñó')
	"ña": "ña", "ñe": "ñe", "ñi": "ñi", "ño": "ño", "ñu": "ñu",

	// Sílabas con F (fo -> fo evita deletreo de 'fó')
	"fa": "fa", "fe": "fe", "fi": "fi", "fo": "fo", "fu": "fu",

	// Sílabas con J
	"ja": "ja", "je": "je", "ji": "ji", "jo": "jo", "ju": "ju",

	// Sílabas con Z y C suave
	"za": "za", "zo": "zo", "zu": "zu", "ce": "ce", "ci": "sí",

	// Sílabas con CH
	"cha": "cha", "che": "che", "chi": "chi", "cho": "cho", "chu": "chu",

	// Sílabas con LL y Y
	"lla": "lla", "lle": "lle", "lli": "lli", "llo": "llo",
	"ya": "ya", "ye": "ye", "yi": "yi", "yo": "yo", "yu": "yu",

	// Sílabas acentuadas o con coda simple
	"bé": "bé", "dor": "dor"
};

const LETTER_PHONETIC_MAP = {
	"a": "á", "á": "á", "b": "be", "c": "ce", "d": "de", "e": "é", "é": "é",
	"f": "efe", "g": "ge", "h": "hache", "i": "í", "í": "í", "j": "jota",
	"k": "ka", "l": "ele", "m": "eme", "n": "ene", "ñ": "eñe",
	"o": "ó", "ó": "ó", "p": "pe", "q": "cu", "r": "erre", "s": "ese",
	"t": "te", "u": "ú", "ú": "ú", "v": "uve", "w": "doble uve",
	"x": "equis", "y": "ye", "z": "zeta"
};

const DISTRACTOR_SYLLABLES = ["ma", "pa", "so", "lu", "te", "ca", "no", "mi", "la", "to", "pe", "sa"];
const DISTRACTOR_LETTERS = ["m", "p", "s", "l", "t", "a", "e", "o", "u", "n", "c", "r"];

/* ==========================================================================
   2. ESTADO GLOBAL DE LA APLICACIÓN
   ========================================================================== */
const state = {
	stars: 0,
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
	if (!("speechSynthesis" in window)) return;
	const voices = window.speechSynthesis.getVoices();
	if (!voices || !voices.length) return;
	selectedSpanishVoice =
		voices.find(v => v.lang.toLowerCase().startsWith("es") && (v.name.includes("Sabina") || v.name.includes("Paulina") || v.name.includes("Monica") || v.name.includes("Google") || v.name.includes("Natural"))) ||
		voices.find(v => v.lang.toLowerCase().startsWith("es")) ||
		null;
}

if ("speechSynthesis" in window) {
	loadSpanishVoice();
	window.speechSynthesis.onvoiceschanged = loadSpanishVoice;
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
	// Protección especial para dígrafos que no existen al inicio de palabra en español
	if (clean.startsWith("rr")) {
		return clean === "rro" ? "rro" : clean.replace(/^rr/, "r");
	}
	return clean;
}

function toSafeLetterPhonetic(letter) {
	const clean = String(letter || "").trim().toLowerCase();
	return LETTER_PHONETIC_MAP[clean] || clean;
}

function speakText(text, rate = 0.9) {
	if (!("speechSynthesis" in window)) return;
	try {
		window.speechSynthesis.cancel();
		const safeLowerText = String(text || "").toLowerCase().trim();
		if (!safeLowerText) return;

		const utter = new SpeechSynthesisUtterance(safeLowerText);
		if (selectedSpanishVoice) utter.voice = selectedSpanishVoice;
		utter.lang = selectedSpanishVoice ? selectedSpanishVoice.lang : "es-ES";
		utter.rate = rate;
		utter.pitch = 1.08;
		window.speechSynthesis.speak(utter);
	} catch (e) { }
}

// Reproduce las sílabas lentamente una por una SIN repetir la palabra completa al final
function speakSlowSyllables() {
	if (!state.currentWordObj) return;
	clearSlowTimers();
	if ("speechSynthesis" in window) window.speechSynthesis.cancel();

	const spokenSyllables = state.currentWordObj.syllables.filter(s => s.trim() !== "");
	const stepDelay = 680;

	spokenSyllables.forEach((syl, idx) => {
		const timerId = setTimeout(() => {
			const phoneticSyl = toSafeSyllablePhonetic(syl);
			speakText(phoneticSyl, 0.82);
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
	stopMicrophone();
	hideFeedback();

	const overlay = document.getElementById("success-overlay");
	if (overlay) overlay.classList.add("hidden");

	state.currentWordObj = pickRandomWord();

	if (state.gameModeFilter === "random") {
		state.currentMode = Math.random() < 0.5 ? "speak" : "build";
	} else {
		state.currentMode = state.gameModeFilter;
	}

	renderCurrentExercise();
}

function renderCurrentExercise() {
	if (!state.currentWordObj) return;

	const badge = document.getElementById("mode-badge");
	const emojiEl = document.getElementById("word-emoji");
	const emojiBtn = document.getElementById("emoji-btn");
	const emojiSpeakerBadge = document.getElementById("emoji-speaker-badge");
	const audioRow = document.getElementById("audio-controls-row");
	const sectionA = document.getElementById("section-mode-a");
	const sectionB = document.getElementById("section-mode-b");

	if (emojiEl) {
		emojiEl.classList.remove("emoji-reveal-anim");
	}

	if (state.currentMode === "speak") {
		// MODO A: LEO Y HABLO (Ocultar emoji para que el niño no adivine la palabra)
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

		// Reproducir la palabra al entrar en Modo Armar
		setTimeout(() => {
			if (state.currentMode === "build" && state.currentWordObj) {
				speakText(state.currentWordObj.phonetic, 0.9);
			}
		}, 220);
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
		speakText(toSafeSyllablePhonetic(tile.value), 0.9);
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

	// Sincronización en segundo plano con Livewire v4 y base de datos MySQL
	syncStarWithBackend(state.currentLevel || 1);

	// Si venía del modo de lectura (hablar), revelamos el emoji con animación antes de abrir el modal
	const emojiEl = document.getElementById("word-emoji");
	const emojiBtn = document.getElementById("emoji-btn");

	if (state.currentWordObj && emojiEl) {
		emojiEl.textContent = state.currentWordObj.emoji;
		if (emojiBtn) emojiBtn.classList.remove("mystery");
		emojiEl.classList.remove("emoji-reveal-anim");
		// Forzar reflow para reiniciar la animación
		void emojiEl.offsetWidth;
		emojiEl.classList.add("emoji-reveal-anim");
	}

	// Mostrar siempre el emoji y la palabra exacta del ejercicio en el modal de éxito
	const successEmoji = document.getElementById("success-emoji");
	const successWord = document.getElementById("success-word");
	if (successEmoji && state.currentWordObj) {
		successEmoji.textContent = state.currentWordObj.emoji;
	}
	if (successWord && state.currentWordObj) {
		successWord.textContent = formatTextCase(state.currentWordObj.word);
	}

	SoundFX.fanfare();
	fireQuickConfetti();

	// Pausa extendida para modo hablar (1.5s) para apreciar el emoji revelado
	const delayBeforeModal = state.currentMode === "speak" ? 1500 : 350;

	const t1 = setTimeout(() => {
		const overlay = document.getElementById("success-overlay");
		if (overlay) overlay.classList.remove("hidden");
	}, delayBeforeModal);

	const t2 = setTimeout(() => {
		nextExercise();
	}, delayBeforeModal + 1250);

	state.transitionTimers.push(t1, t2);
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
	const starEl = document.getElementById("star-count");
	if (starEl) {
		const initialStars = starEl.dataset && starEl.dataset.initialStars !== undefined
			? parseInt(starEl.dataset.initialStars, 10)
			: parseInt(localStorage.getItem("aventura_letras_stars") || "0", 10);
		state.stars = isNaN(initialStars) ? 0 : initialStars;
		starEl.textContent = String(state.stars);
	}

	// Leer palabras iniciales inyectadas por Livewire en data-words
	const gameArena = document.getElementById("game-arena");
	if (gameArena) {
		if (gameArena.dataset.level) {
			state.currentLevel = parseInt(gameArena.dataset.level, 10) || 1;
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

	window.addEventListener("level-started", (event) => {
		const detail = event.detail?.[0] || event.detail || {};
		if (detail.level !== undefined) {
			state.currentLevel = parseInt(detail.level, 10) || 1;
		}
		if (detail.stars !== undefined) {
			state.stars = parseInt(detail.stars, 10) || 0;
			const currentStarEl = document.getElementById("star-count");
			if (currentStarEl) currentStarEl.textContent = String(state.stars);
			localStorage.setItem("aventura_letras_stars", String(state.stars));
		}
		if (Array.isArray(detail.words) && detail.words.length > 0) {
			updateWordsPool(detail.words);
		}
		nextExercise();
	});

	document.getElementById("btn-reset-stars")?.addEventListener("click", () => {
		state.stars = 0;
		localStorage.setItem("aventura_letras_stars", "0");
		if (starEl) starEl.textContent = "0";
		SoundFX.pop();
		const wire = getLivewireGameComponent();
		if (wire && typeof wire.resetStars === "function") {
			wire.resetStars(1);
		}
	});

	document.getElementById("btn-toggle-case")?.addEventListener("click", () => {
		state.isUppercase = !state.isUppercase;
		const labelCaseDesktop = document.getElementById("label-case-desktop");
		const labelCaseMobile = document.getElementById("label-case-mobile");
		if (labelCaseDesktop) labelCaseDesktop.textContent = state.isUppercase ? "MAYÚSCULAS" : "minúsculas";
		if (labelCaseMobile) labelCaseMobile.textContent = state.isUppercase ? "MAY" : "min";
		SoundFX.pop();
		if (state.currentMode === "speak") {
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