// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to get classes from sentence_object by index
// Get all the keys of classes, then filter them by values that include index
// Returns an array to assign to word spans when sentence loads for markup

import $ from './jquery-cdn.js';
import { sentence_object, user_interface } from './main.js';

export function getClassesbyIndex(index) {
	let tree_nodes_to_string = Object.keys(sentence_object.nodes).filter(key => sentence_object.nodes[key].includes(index));
	let word_classes_to_string = Object.keys(sentence_object.classes).filter(key => sentence_object.classes[key].includes(index));
	let tree_nodes_string = "";
	let word_classes_string = "";
	let all_classes_string = "";

	if (tree_nodes_to_string.length > 0) {
		tree_nodes_string = tree_nodes_to_string.join(' ');
	}

	if (word_classes_to_string.length > 0) {
		word_classes_string = word_classes_to_string.join(' ');
	}

	if (user_interface === "make-trees") {
		return tree_nodes_string;
	}

	if (user_interface === "stage-sentences"){
		return word_classes_string;
	}
}
