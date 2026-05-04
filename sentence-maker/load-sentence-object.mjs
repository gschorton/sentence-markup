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

	// In case user has selected some words in another sentence before loading a new one
	selected_indices.length = 0;

	// Clone imported array to create new data reference
	let clone_obj = JSON.parse(JSON.stringify(obj));
	sentence_object.id = clone_obj.id;
	sentence_object.t = clone_obj.t;
	sentence_object.p = clone_obj.p;
	sentence_object.w = clone_obj.w;
	sentence_object.c = clone_obj.c;
	sentence_object.be = clone_obj.be;
	restoreSentenceMarkup();
}