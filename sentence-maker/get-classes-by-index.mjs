// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to get classes from sentence_object by index
// Get all the keys of classes, then filter them by values that include index
// Returns an array to assign to word spans when sentence loads for markup

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';

export function getClassesbyIndex(index) {
	let word_classes_to_string = Object.keys(sentence_object.c).filter(key => sentence_object.c[key].includes(index));
	let word_classes_string = "";
	if (word_classes_to_string.length > 0) {
		word_classes_string = word_classes_to_string.join(' ');
	}
	return word_classes_string;
}
