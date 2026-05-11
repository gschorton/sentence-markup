// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add sortable classes to sentence object

import $ from './jquery-cdn.js';
import {word_classes_sorted} from './sort-classes.mjs';
import {tree_nodes_sorted} from './sort-classes.mjs';
import {sentence_object, user_interface} from './main.js';

export function addClasses (){
	
	// For each class, key is class name [0] and value is array of indices [1]
	// Add tree_nodes or word_classes based on user option
	if(tree_nodes_sorted.length > 0 && user_interface === "make-trees"){
		sentence_object.nodes = {};
		for (let i=0; i<tree_nodes_sorted.length; i++){
			sentence_object.nodes[tree_nodes_sorted[i][0]] = tree_nodes_sorted[i][1];
		}
	}

	if(word_classes_sorted.length > 0 && user_interface === "stage-sentences"){
		sentence_object.classes = {};
		for (let i=0; i<word_classes_sorted.length; i++){
			sentence_object.classes[word_classes_sorted[i][0]] = word_classes_sorted[i][1];
		}
	}
}