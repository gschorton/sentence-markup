// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to delete elements already marked in sentence

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

export function deleteElement(j) {
	return function(event) {
		$(".highlighted").removeClass("highlighted");	//remove highlighting from sent-words
		$(".bracket-buttons").removeClass("visible");	//hide bracket buttons
		
		let key = Object.keys(sentence_object.c)[j];

	// remove key for class from object
	if (Array.isArray(sentence_object.c[key])) {
			delete sentence_object.c[key];
		}
		delete sentence_object.be[j];
		restoreSentenceMarkup();
	};
}