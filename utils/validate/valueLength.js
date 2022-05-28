export default function lengthValueTexbox(
	valueFromTextbox,
	numberOfCharacters
) {
	if (valueFromTextbox.length < numberOfCharacters) {
		return false;
	} else {
		return true;
	}
}
