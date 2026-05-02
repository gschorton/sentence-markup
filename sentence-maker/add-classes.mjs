// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add sortable classes to sentence object

import $ from './jquery-cdn.js';
import {word_classes_sorted} from './sort-word-classes.mjs';
import {sentence_object} from './main.js';

export function addClasses (){

	sentence_object.c = {};
	
	// For each class, key is class name [0] and value is array of indices [1]
	if(word_classes_sorted.length > 0){
		for (let i=0; i<word_classes_sorted.length; i++){
			sentence_object.c[word_classes_sorted[i][0]] = word_classes_sorted[i][1];
		}
	}
}