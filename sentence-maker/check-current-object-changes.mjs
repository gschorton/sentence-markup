// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {active_sentences} from './save-current-sentence.mjs'

// Function to get current sentence object
// Compare to matching active object to see if changed

export function checkCurrentObjectChanges(item){
		
	if(active_sentences.length > 0){
		
		for(let i=0; i<active_sentences.length; i++){
			if(active_sentences[i].id != sentence_object.id){
				$('#save-current-sentence').show().html("Save sentence to active list");
			}
		}
		
		for(let i=0; i<active_sentences.length; i++){	
			// Ids match
			if(active_sentences[i].id === sentence_object.id){
				
				// Check other parts of object for differences
				let saved_t = active_sentences[i].t;
				let saved_p = JSON.stringify(active_sentences[i].p);
				let saved_c = JSON.stringify(active_sentences[i].c);
				let new_save_t = sentence_object.t;
				let new_save_p = JSON.stringify(sentence_object.p);
				let new_save_c = JSON.stringify(sentence_object.c);
				
				if(saved_t != new_save_t || saved_p != new_save_p || saved_c != new_save_c){
					$('#save-current-sentence').show().html("Update sentence in active list");
				}else{
					$('#save-current-sentence').show().html("Sentence updated!");
				}
			}	
		}
		
	// Active array is empty	
	}else{
		$('#save-current-sentence').show().html("Save sentence to active list");
	}
}