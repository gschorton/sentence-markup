// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)
 
// Function to add sentence-level features to sentence object
// Add new features based on selectors (type and pattern)

import $ from './jquery-cdn.js';
import {selected_indices} from './select-words.mjs';
import {sentence_object} from './main.js';
import { loadSentenceObject } from './load-sentence-object.mjs';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

export function addFeatures (){
	
	let patterns_checked = [];
	let type_selected = "";
	
	// Get and add pattern(s)
	patterns_checked = $(".selectors-sen-pat:checked").map(function() {
		return $(this).val();
	}).get();
	
	for (let i=0; i<patterns_checked.length; i++){
		patterns_checked[i] = Number(patterns_checked[i]);
	}
	sentence_object.patterns = patterns_checked;
	
	// Get and add type
	type_selected = $(".selectors-sen-typ.sen-selected").val();

	if(type_selected){
		sentence_object.type = type_selected;
	}

	restoreSentenceMarkup();
}