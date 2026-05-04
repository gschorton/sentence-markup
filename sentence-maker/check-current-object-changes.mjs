// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

import $ from './jquery-cdn.js';
import { loadSentenceObject } from './load-sentence-object.mjs';
import {sentence_object} from './main.js';
import {active_sentences} from './save-current-sentence.mjs'

// Function to get current sentence object
// Compare to matching active object to see if changed

export function checkCurrentObjectChanges(item){

	// Default condition for button
	$('#save-current-sentence').html("Save sentence to active list");
	let new_save_t = item.t;
	let new_save_p = JSON.stringify(item.p);
	let new_save_w = JSON.stringify(item.w);
	let new_save_c = JSON.stringify(item.c);
	let new_save_be = JSON.stringify(item.be);
	
	// Change button if sentence is already active
	for(let i=0; i<active_sentences.length; i++){	
		
		let saved_w = JSON.stringify(active_sentences[i].w);
		// Ids or words match
		if(active_sentences[i].id === item.id || saved_w === new_save_w){

			// Check other parts of object for differences
			let saved_t = active_sentences[i].t;
			let saved_p = JSON.stringify(active_sentences[i].p);
			let saved_c = JSON.stringify(active_sentences[i].c);
			let saved_be = JSON.stringify(active_sentences[i].be);

			if(saved_t === new_save_t && saved_p === new_save_p && saved_c === new_save_c && saved_be === new_save_be){
				$('#save-current-sentence').html("Sentence updated!");

				// Assign "loaded" class to sentence currently loaded for markup
				if ($("#start-input span:first").data('id') !== undefined) {
					let data_id = $("#start-input span:first").data('id');
					$('.sent-obj-active[data-id='+data_id+']').addClass("loaded");
					$('.sent-obj[data-id='+data_id+']').addClass("loaded");
				} 
			}else if(item.t === "" && item.p.length === 0 && Object.keys(item.c).length === 0 && Object.keys(item.be).length === 0){
				loadSentenceObject(active_sentences[i]);
			}else {
				$('#save-current-sentence').html("Update sentence in active list");
			}
		}	
	}
}