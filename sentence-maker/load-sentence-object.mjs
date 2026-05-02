// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {restoreSentenceMarkup} from './restore-sentence-markup.mjs';
import {selected_indices} from './select-words.mjs';


// Function to get existing sentence object
// Work with original or filtered array of objects
export function loadSentenceObject(obj){

	// Back to main page for markup
	$.modal.close();
	console.log("Preparing sentence for markup ...");

	selected_indices.length = 0;		// In case user has selected some words in another sentence before loading a new one
	sentence_object.id = obj.id;
	sentence_object.t = obj.t;
	sentence_object.p = obj.p;
	sentence_object.w = obj.w;
	sentence_object.c = obj.c;
	restoreSentenceMarkup();
}