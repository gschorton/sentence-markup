// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to save current sentence
// Check if loaded from saved array
// Otherwise just push into array

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {showActiveSentences} from './show-active-sentences.mjs';

export let active_sentences = [];
export let active_sentences_temp = [];

export function saveCurrentSentence (){
	
	$('#save-current-sentence').show().html("Sentence updated!");
	
	let current_sentence = JSON.parse(JSON.stringify(sentence_object));

	// Check if empty, if so, add
	if(active_sentences.length < 1){
		
		active_sentences.push(current_sentence);
		
	}else{ // Array contains elements already, loop
		// Check for duplicate in all elements
		let duplicate_words = false;
		let duplicate_id = false;
		for (let i=0; i < active_sentences.length; i++){
			let saved_t = active_sentences[i].t;
			let saved_p = JSON.stringify(active_sentences[i].p);
			let saved_w = JSON.stringify(active_sentences[i].w);
			let saved_c = JSON.stringify(active_sentences[i].c);
			let new_save_t = current_sentence.t;
			let new_save_p = JSON.stringify(current_sentence.p);
			let new_save_w = JSON.stringify(current_sentence.w);
			let new_save_c = JSON.stringify(current_sentence.c);
			
			if(active_sentences[i].id === current_sentence.id){
				duplicate_id = true;
				if(saved_t != new_save_t || saved_p != new_save_p || saved_c != new_save_c){
					active_sentences[i].t = current_sentence.t;
					active_sentences[i].p = current_sentence.p;
					active_sentences[i].c = current_sentence.c;					
				}
			}else if(active_sentences[i].id != current_sentence.id){
				if(saved_w === new_save_w){
					duplicate_words = true;
				}	
			}
		}
		if(!duplicate_words && !duplicate_id){
			active_sentences.push(current_sentence);
		}else if(duplicate_words && !duplicate_id){
			$('#save-current-sentence').show().html("Sentence already active!");
			$("#start-input").html("<span style=\"font-size: .7em\">(Work on a sentence by starting one, finding one, or opening an active one)</span>"); // clear sentence mark-up area
		}
	}

	console.log("Active sentence objects ("+active_sentences.length+"):", active_sentences);
	showActiveSentences(active_sentences);
}

	// if active, remove and re-add to avoid duplicating	
//	for (let i=0; i < active_sentences.length; i++){
//		if(active_sentences[i].id === current_sentence.id){
//			active_sentences.push(JSON.parse(JSON.stringify(current_sentence)));
//			}else{
//				active_sentences[i] = JSON.parse(JSON.stringify(current_sentence));
//			}
//		}

// Save loaded sentences
// Save new sentences
// To come back to a sentence and update it, use classes
// to indicate new or loaded and assign id to DOM to keep
// track of which sentence object it is in the stored array

// The sentence_objects in the array can be updated and then
// the whole array can be downloaded, instead of one sentence
// at a time.
