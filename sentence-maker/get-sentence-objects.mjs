// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to get existing sentence objects from json file
// Creates new array of indexed sentences to display

import $ from './jquery-cdn.js';
import {renderList} from './render-list.mjs';

export let sentence_list = [];
export let indexed_sentences = [];

export function getSentenceObjects(file){
	
	sentence_list.length = 0;
	
	// Ensures most recent version instead of cached version
	$.getJSON( "sentence-maker/sentence-files/"+file+"?t=" + Date.now(), function( data ) {
		console.log("Loading sentences from external JSON ...");
		sentence_list = data.sentences;

		// Check for data before mapping and sending to renderList()
		// Mapping to add unique id key to objects during session
		// Unique id is "file_name-index" to avoid duplicate ids in session
		if(sentence_list.length > 0){
			let file_name = file.split(".")[0];
			indexed_sentences = sentence_list
			.map((obj, index)=> ({
				...obj,
				id: file_name+"-"+index
			}));
			renderList(indexed_sentences);
		}
	})
	.done(function() {
		console.log("Complete.");
	})
	.fail(function() {
		console.log( "Sentences did not load." );
	})
	.always(function() {
//		console.log( "Complete. Did it work?" );
	});
}