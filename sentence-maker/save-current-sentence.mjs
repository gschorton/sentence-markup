// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to save current sentence
// Check if already in active_sentences
// Add to active_sentences if missing
// Update if sentence_objects are not identical
// Prevent save if words of new sentence are identical
// to one saved in active_sentences 

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {showActiveSentences} from './show-active-sentences.mjs';

export let active_sentences = [];

export function saveCurrentSentence (){
	
	$('#save-current-sentence').html("Sentence updated!");
	
	// Clone sentence_object to create new data reference
	let current_sentence = JSON.parse(JSON.stringify(sentence_object));

	// If no active sentences, add new one
	// If active sentences exist, check if current is active
	// Update active sentence if current has different properties
	// Add current sentence if not already active
	if(active_sentences.length < 1){
		active_sentences.push(current_sentence);
	}else{
		let duplicate_id = false;
		for (let i=0; i < active_sentences.length; i++){
			if(active_sentences[i].id === current_sentence.id){
				duplicate_id = true;
				let saved_t = active_sentences[i].t;
				let saved_p = JSON.stringify(active_sentences[i].p);
				let saved_c = JSON.stringify(active_sentences[i].c);
				let saved_be = JSON.stringify(active_sentences[i].be);
				let new_save_t = current_sentence.t;
				let new_save_p = JSON.stringify(current_sentence.p);
				let new_save_c = JSON.stringify(current_sentence.c);
				let new_save_be = JSON.stringify(current_sentence.be);
			
				if(saved_t != new_save_t || saved_p != new_save_p || saved_c != new_save_c || saved_be != new_save_be){
					active_sentences[i].t = current_sentence.t;
					active_sentences[i].p = current_sentence.p;
					active_sentences[i].c = current_sentence.c;
					active_sentences[i].be = current_sentence.be;
				}
			}
 		}
		if(!duplicate_id){
			active_sentences.push(current_sentence);
		}
	}
	showActiveSentences(active_sentences);
}
