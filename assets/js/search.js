const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const BANGS = {
	"!yt": (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
	"!gh": (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
	"!w": (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
};

window.addEventListener("load", () => {
	searchInput?.focus();
});

// Press "/" outside text inputs to focus the search bar
document.addEventListener("keydown", (event) => {
	const target = event.target;
	const isTyping =
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target?.isContentEditable;

	if (event.key === "/" && !isTyping) {
		event.preventDefault();
		searchInput?.focus();
		searchInput?.select();
	}
});

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const raw = searchInput.value.trim();
	if (!raw) return;

	const [firstToken, ...rest] = raw.split(/\s+/);
	const bangKey = firstToken.toLowerCase();

	if (BANGS[bangKey]) {
		const term = rest.join(" ");
		window.location.href = BANGS[bangKey](term);
		return;
	}

	if (raw.startsWith("http://") || raw.startsWith("https://")) {
		window.location.href = raw;
		return;
	}

	if (!raw.includes(" ") && raw.includes(".")) {
		window.location.href = `https://${raw}`;
		return;
	}

	window.location.href = `https://www.google.com/search?q=${encodeURIComponent(raw)}`;
});