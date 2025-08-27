const arb = {
	"a": "ا",
	"-": "ء",
	"--": "أ",
	"-a": "إ",

	"b": "ب",

	"t": "ت",
	"t'": "ث",
	"h'": "ة",
	"H'": "ة",

	"j": "ج",
	"7": "ح",
	"5": "خ",

	"d": "د",
	"d'": "ذ",
	"r": "ر",
	"z": "ز",
	"s": "س",

	"sh": "ش",
	"s'": "ش",

	"S": "ص",
	"D": "ض",
	"D'": "ض",

	"T": "ط",
	"T'": "ظ",

	"3": "ع",
	"3'": "غ",
	"gh": "غ",

	"f": "ف",

	"9": "ق",
	"q": "ق",

	"k": "ك",
	"l": "ل",
	"m": "م",
	"n": "ن",
	"h": "ه",
	"H": "ه",

	"w": "و",
	"o": "و",
	"w-": "ؤ",
	"o-": "ؤ",

	"y": "ي",
	"i": "ي",
	"i-": "ئ",
	"i'": "ى",
	"y-": "ئ",
	"y'": "ى",

	".": ".",
	",": "،",
	";": "؛",
	"?": "؟",
	"!": "!",
}

class ArabicKeyboard {
	constructor(inputElement, toggleElement) {
		// Get input and toggle button elements
		this.inputElement = typeof inputElement === 'string' ?
			document.querySelector(inputElement) : inputElement;
		this.toggleElement = typeof toggleElement === 'string' ?
			document.querySelector(toggleElement) : toggleElement;

		// Set initial state
		this.conversionActive = true;
		this.buffer = '';
		this.convertedChars = [];

		// Initialize event listeners
		this.init();
	}

	init() {
		// Listen for input events
		this.inputElement.addEventListener('input', (e) => this.handleInput(e));
		this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
		this.inputElement.addEventListener('click', (e) => this.handleClick(e));

		// Set up toggle button
		if (this.toggleElement) {
			this.toggleElement.addEventListener('click', () => this.toggleMode());
			this.updateToggleButton();
		}
	}

	handleInput(event) {
		if (!this.conversionActive) return;

		// Get current cursor position and text value
		const cursorPos = this.inputElement.selectionStart;
		// const value = this.inputElement.value;

		// Check what was just added
		if (event.inputType === 'insertText' && event.data) {
			// Get the character that was just typed
			const newChar = event.data;

			// Add to buffer
			this.buffer += newChar;

			// Process the buffer to check for conversions
			this.processBuffer(cursorPos);
		}
		console.log("bff: " + this.buffer)
	}

	processBuffer(cursorPos) {
		// if (this.buffer.length == 2 && !(this.buffer in arb))
			// this.buffer = '';

		// Get the current value
		const value = this.inputElement.value;

		// Look for matches in Arabic dictionary from longest to shortest
		const keys = Object.keys(arb)
			.filter(key => this.buffer.endsWith(key))
			.sort((a, b) => b.length - a.length);

		if (keys.length > 0) {
			const key = keys[0]; // Take the longest match

			// Calculate positions for replacement
			const start = cursorPos - key.length;
			const end = cursorPos;

			// Get text before and after the matched sequence
			const beforeMatch = value.substring(0, start);
			const afterMatch = value.substring(end);

			// Replace with Arabic character
			this.inputElement.value = beforeMatch + arb[key] + afterMatch;

			// Set cursor to appropriate position
			const newCursorPos = beforeMatch.length + 1;
			this.inputElement.selectionStart = newCursorPos;
			this.inputElement.selectionEnd = newCursorPos;

			// Track this converted character
			this.convertedChars.push({
				position: beforeMatch.length,
				original: key,
				arabic: arb[key]
			});

			// Remove matched characters from buffer (while preserving the rest)
			// this.buffer = this.buffer.substring(0, this.buffer.length - key.length);
		}

		// Keep buffer from growing too large
		if (this.buffer.length > 2) {
			this.buffer = this.buffer.substring(this.buffer.length - 2);
		}
	}

	handleKeyDown(event) {
		// Handle special keys
		if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
			// Reset buffer on navigation
			this.buffer = '';
		}

		// Handle backspace - update buffer
		if (event.key === 'Backspace' || event.key === 'Delete') {
			if (this.buffer.length > 0) {
				this.buffer = this.buffer.slice(0, -1);
			}
		}

		// Handle special case for first character
		if (this.inputElement.value.length === 0 && !event.ctrlKey && !event.altKey &&
			!event.metaKey && event.key.length === 1) {
			// This will be the first character - ensure the buffer is clean
			this.buffer = '';
		}
		// console.log(this.buffer)
	}

	handleClick() {
		// Reset buffer on click (changing cursor position)
		this.buffer = '';
	}

	toggleMode() {
		this.conversionActive = !this.conversionActive;
		this.buffer = ''; // Reset buffer when toggling
		this.updateToggleButton();
	}

	updateToggleButton() {
		if (this.toggleElement) {
			this.toggleElement.textContent = this.conversionActive ? 'Arabic: ON' : 'Arabic: OFF';
		}
	}
}
