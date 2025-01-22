const arb = {
	"a": "ا",
	"a-": "أ",
	"b": "ب",
	"t": "ت",
	"t'": "ث",
	"j": "ج",
	"7": "ح",
	"5": "خ",
	"d": "د",
	"d'": "ذ",
	"r": "ر",
	"z": "ز",
	"s": "س",
	"سh": "ش",
	"S": "ص",
	"D": "ض",
	"T": "ط",
	"T'": "ظ",
	"3": "ع",
	"3'": "غ",
	"f": "ف",
	"9": "ق",
	"k": "ك",
	"l": "ل",
	"m": "م",
	"n": "ن",
	"h": "ه",
	"w": "و",
	"o": "و",
	"y": "ي",
	"i": "ي",
	"-": "ء",
	"w-": "ؤ",
	"y-": "ئ"
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