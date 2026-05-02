// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to send coded sentence to tree maker

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';

export function sendSentence() {
	if(Object.keys(sentence_object.c).length > 0){
		let sentence_coded = $("#start-input").clone();
		sentence_coded.find(".punc").last().remove();
		let sentence_ready = sentence_coded.text();
		$("#code").val('').blur();
		$("#code").val(sentence_ready).trigger('input');
	}
}