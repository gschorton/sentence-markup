// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to reset and create new sentence_object with words from input box
// Used to get input sentence and split words into sentence words array
// Becomes data structure for loading new sentence into DOM

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';

export function createSentenceObject(){

	// Back to main page for markup
	$.modal.close();
	console.log("Building new sentence ...");

	// empty sentence_object and assign new session id
	// id will not be part of downloaded object
	sentence_object.id = "new-"+$(".sent-obj-new").length;
	sentence_object.t = "";
	sentence_object.p = [];
	sentence_object.w = [];
	sentence_object.c = {};

	// empty sentence_words array
	// // split text from input box into array by space
	let sentence_words = [];
	let input_words = $("#sentence-input-text").val().split(" ");

	// loop through array of new words
	// store words in sentence_words
	for (let i=0; i<input_words.length; i++){
		sentence_words.push(input_words[i]);
	};

	// Add words to sentence_object
	// Starting condition of any new sentence_object
	// Additional mark up updates sentence_object before saving to JSON
	sentence_object.w = sentence_words;
	$(".loaded").removeClass("loaded");
}