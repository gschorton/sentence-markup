// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

import $ from './jquery-cdn.js';
import { loadSentenceObject } from './load-sentence-object.mjs';
import {sentence_object} from './main.js';
import {active_sentences} from './save-current-sentence.mjs'

// Function to get current sentence object
// Compare to matching active object to see if changed

export function checkCurrentObjectChanges(obj){

	// Default condition for button
	$('#save-current-sentence').html("Save sentence to active list");
	let new_save_type = obj.type;
	let new_save_patterns = JSON.stringify(obj.patterns);
	let new_save_words = JSON.stringify(obj.words);
	let new_save_classes = JSON.stringify(obj.classes);
	let new_save_nodes = JSON.stringify(obj.nodes);
	let new_save_arrows = JSON.stringify(obj.arrows);
	
	// Change button if sentence is already active
	for(let i=0; i<active_sentences.length; i++){	
		
		let saved_words = JSON.stringify(active_sentences[i].words);
		// Ids or words match
		if(active_sentences[i].id === obj.id || saved_words === new_save_words){

			// Check other parts of object for differences
			let saved_type = active_sentences[i].type;
			let saved_patterns = JSON.stringify(active_sentences[i].patterns);
			let saved_classes = JSON.stringify(active_sentences[i].classes);
			let saved_nodes = JSON.stringify(active_sentences[i].nodes);
			let saved_arrows = JSON.stringify(active_sentences[i].arrows);

			if(saved_type === new_save_type && saved_patterns === new_save_patterns && saved_classes === new_save_classes && saved_nodes === new_save_nodes && saved_arrows === new_save_arrows){
				$('#save-current-sentence').html("Sentence updated!");

				// Assign "loaded" class to sentence currently loaded for markup
				if ($("#start-input span:first").data('id') !== undefined) {
					let data_id = $("#start-input span:first").data('id');
					$('.sent-obj-active[data-id='+data_id+']').addClass("loaded");
					$('.sent-obj[data-id='+data_id+']').addClass("loaded");
				} 
			}else if(obj.type === "" && obj.patterns.length === 0 && Object.keys(obj.classes).length === 0 && Object.keys(obj.nodes).length === 0 && Object.keys(obj.arrows).length === 0){
				loadSentenceObject(active_sentences[i]);
			}else {
				$('#save-current-sentence').html("Update sentence in active list");
			}
		}	
	}
}