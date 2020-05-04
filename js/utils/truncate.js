export function truncateString(string, num) {
	if (String(string).length <= num) {
		return string;
	} else {
		return String(string).slice(0, num);
	};
}