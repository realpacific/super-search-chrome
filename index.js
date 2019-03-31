var suggestions = [{
		content: 'https://stackoverflow.com/search?q=',
		description: 'so'
	},
	{
		content: 'https://www.youtube.com/results?search_query=',
		description: 'yt'
	},
	{
		content: 'https://medium.com/search?q=',
		description: 'md'
	},
	{
		content: 'https://github.com/search?q=',
		description: 'gh'
	}
];

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
	// suggest(suggestions)
});

chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
	const breakpoint = text.indexOf(' ');
	const searchIn = text.slice(0, breakpoint);

	for (let i = 0; i < suggestions.length; i++) {
		if (suggestions[i].description == searchIn) {
			const searchUrl = suggestions[i].content + text.slice(breakpoint + 1);
			openLink(searchUrl);
		}
	}
});

function openLink(url) {
	var data = {
		url: ''
	};
	data.url = url;
	chrome.tabs.query({
			active: true,
			currentWindow: true
		},
		function (tabs) {
			var tab = tabs[0];
			chrome.tabs.update(tab.id, data);
		}
	);
}