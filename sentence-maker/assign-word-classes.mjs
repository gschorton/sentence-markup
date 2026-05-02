// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add classes to word_classes_tosort
// Add existing ones from current word_classes_sorted
// Add new ones based on markup selectors
// Adding to word_classes_tosort prepares for sorting based on frequency
// Adding to word_classes_assigned keeps track of every class assigned

import $ from './jquery-cdn.js';
import {selected_indices} from './select-words.mjs';
import {sentence_object} from './main.js';
import {word_classes_sorted} from './sort-word-classes.mjs';

export let word_classes_assigned = []; // Array to store every assigned word class
export let word_classes_tosort = []; // Array to store word classes to sort

export function assignWordClasses (){
	word_classes_tosort.length = 0; 	// Reset array to store word classes to sort
	word_classes_assigned.length = 0;	// Reset array to control unique word classes

	// Restore array of classes to sort with current sortable classes
	if(Object.keys(sentence_object.c).length > 0){
		for (let i=0; i<Object.keys(sentence_object.c).length; i++){
			word_classes_tosort.push([Object.keys(sentence_object.c)[i],Object.values(sentence_object.c)[i]]);
			word_classes_assigned.push(i);	// to make sure new markup is unique
		}
	}
	
	// get selected ids	and add class and index to sentence_object
	if(selected_indices.length > 0){
		let label_to_add = $(".selected").val();
		let indices_to_add = [...selected_indices];
		let class_to_add = label_to_add+"-"+word_classes_assigned.length;
		word_classes_tosort.push([class_to_add,indices_to_add]);
		word_classes_assigned.push(class_to_add);	// to make sure each new markup is unique
		selected_indices.length = 0;
	}
}