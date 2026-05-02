// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to download active sentences from session
// Uses URI approach for smaller data (vs. blob)import $ from './jquery-cdn.js';

import $ from './jquery-cdn.js';
import { active_sentences } from './save-current-sentence.mjs';

export function downloadJSON() {
	let sentences_array_download = JSON.parse(JSON.stringify(active_sentences));
	for (let i = 0; i < sentences_array_download.length; i++) {
		delete sentences_array_download[i].id;
	}

	let timestamp = new Date().toISOString().replace(/[:.]/g, '-');
	$("<a />", {
		"download": "sentences-" + timestamp + ".json",
		"href": "data:application/json," + encodeURIComponent(JSON.stringify(sentences_array_download))
	}).appendTo("body").click(function () {
		$(this).remove()
	})[0].click()

	console.log("Downloading your sentences ...");
}