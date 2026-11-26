const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

window.addEventListener("load", () => {
	searchInput?.focus();
});

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const query = searchInput.value.trim();
	if (!query) return;

	if (query.startsWith("http://") || query.startsWith("https://")) {
		window.location.href = query;
		return;
	}

	if (!query.includes(" ") && query.includes(".")) {
		window.location.href = `https://${query}`;
		return;
	}

	window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
});