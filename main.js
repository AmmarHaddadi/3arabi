const arb = {
	"a": "ا",
	"ا-": "أ",
	"أ-": "إ",

	"b": "ب",

	"t": "ت",
	"ت'": "ث",
	"ه'": "ة",

	"j": "ج",
	"7": "ح",
	"5": "خ",

	"d": "د",
	"د'": "ذ",
	"r": "ر",
	"z": "ز",
	"s": "س",

	"سh": "ش",
	"س'": "ش",

	"S": "ص",
	"D": "ض",
	"ص'": "ض",

	"T": "ط",
	"ط'": "ظ",

	"3": "ع",
	"ع'": "غ",
	"gh": "غ",

	"f": "ف",

	"9": "ق",
	"q": "ق",
	
	"k": "ك",
	"l": "ل",
	"m": "م",
	"n": "ن",
	"h": "ه",

	"w": "و",
	"o": "و",
	"w-": "ؤ",

	"y": "ي",
	"i": "ي",
	"ي-": "ئ",

	"-": "ء",


}

// chars that modify previous value
// const modifiers = ['-', "'", 'h'];

function replaceCharacters(event) {
	const input = event.target;
	const inputValue = input.value;
	let replacement = '';
	let i = 0;

	while (i < inputValue.length) {
		let comb = inputValue[i-1] + inputValue[i];
		// console.log(`${comb}`);
		if (arb[comb]) {
			replacement = replacement.slice(0, -1) + arb[comb];
		} else {
			replacement += arb[inputValue[i]] || inputValue[i];
		} 
		i++;
	}
	input.value = replacement;
}

function main() {
	const inputField = document.getElementById('txt');

	inputField.addEventListener('input', replaceCharacters);
}

main();