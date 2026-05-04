// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to sort word classes into new array based on
// first index, then string, then length before reloading

import $ from './jquery-cdn.js';
import {word_classes_tosort} from './assign-word-classes.mjs'
import {sentence_object} from './main.js';

export let word_classes_sorted =[];

export function sortWordClasses(data) {

	word_classes_sorted.length = 0;

	for (let i = 0; i < word_classes_tosort.length; i++) {
		word_classes_sorted.push([word_classes_tosort[i][0], word_classes_tosort[i][1]]);
	}

	// Sort by start index, then alpha, then length
	if(word_classes_sorted.length > 0){
		word_classes_sorted.sort((a, b) => (a[1][0] - b[1][0]) || 
								a[0].localeCompare(b[0]) ||
								b[1].length - a[1].length);
	}

	// Rename classes according to new sorted list
	for (let i = 0; i < word_classes_sorted.length; i++) {
		word_classes_sorted[i][0] = word_classes_sorted[i][0].slice(0, word_classes_sorted[i][0].lastIndexOf("-")) + "-" + i;
	}

	console.log("Number of classes sorted: "+word_classes_sorted.length);
}