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
				let saved_type = active_sentences[i].type;
				let saved_patterns = JSON.stringify(active_sentences[i].patterns);
				let saved_classes = JSON.stringify(active_sentences[i].classes);
				let saved_nodes = JSON.stringify(active_sentences[i].nodes);
				let saved_arrows = JSON.stringify(active_sentences[i].arrows);
				let new_save_type = current_sentence.type;
				let new_save_patterns = JSON.stringify(current_sentence.patterns);
				let new_save_classes = JSON.stringify(current_sentence.classes);
				let new_save_nodes = JSON.stringify(current_sentence.nodes);
				let new_save_arrows = JSON.stringify(current_sentence.arrows);
			
				if(saved_type != new_save_type || saved_patterns != new_save_patterns || saved_classes != new_save_classes || saved_nodes != new_save_nodes || saved_arrows != new_save_arrows){
					active_sentences[i].type = current_sentence.type;
					active_sentences[i].patterns = current_sentence.patterns;
					active_sentences[i].classes = current_sentence.classes;
					active_sentences[i].nodes = current_sentence.nodes;
					active_sentences[i].arrows = current_sentence.arrows;
				}
			}
 		}
		if(!duplicate_id){
			active_sentences.push(current_sentence);
		}
	}
	showActiveSentences(active_sentences);
}
