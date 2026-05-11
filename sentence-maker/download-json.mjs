// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to download active sentences from session
// Uses URI approach for smaller data (vs. blob)import $ from './jquery-cdn.js';

import $ from './jquery-cdn.js';
import { active_sentences } from './save-current-sentence.mjs';

export function downloadJSON() {

	// Map to remove id and minify keys
	let sentences_download = active_sentences
	.map((obj)=> ({
		t: obj.type,
		p: obj.patterns,
		w: obj.words,
		wc: obj.classes,
		tn: obj.nodes,
		ta: obj.arrows
	}));

	let timestamp = new Date().toISOString().replace(/[:.]/g, '-');
	$("<a />", {
		"download": "sentences-" + timestamp + ".json",
		"href": "data:application/json," + encodeURIComponent(JSON.stringify(sentences_download))
	}).appendTo("body").click(function () {
		$(this).remove()
	})[0].click()

	console.log("Downloading your sentences ...");
}