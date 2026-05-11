// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to delete elements already marked in sentence

import $ from './jquery-cdn.js';
import { sentence_object, user_interface } from './main.js';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

export function deleteElement(j) {
	return function(event) {
		$(".highlighted").removeClass("highlighted");	//remove highlighting from sent-words
		$(".bracket-buttons").removeClass("visible");	//hide bracket buttons
		
		// Delete tree_node or word_class based on user option
		if (user_interface === "make-trees") {
			let key = Object.keys(sentence_object.nodes)[j];
			delete sentence_object.nodes[key];
			delete sentence_object.arrows[j];
		}else if (user_interface === "stage-sentences") {
			let key = Object.keys(sentence_object.classes)[j];
			delete sentence_object.classes[key];
		}
		restoreSentenceMarkup();
	};
}