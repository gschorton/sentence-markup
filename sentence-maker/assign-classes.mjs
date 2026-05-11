// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add classes to arrays to sort
// Add existing classes from current arrays sorted
// Add new ones based on markup selectors
// Adding to arrays to sort prepares for sorting based on frequency
// Adding to assigned arrays keeps track of every class assigned

import $ from './jquery-cdn.js';
import { selected_indices } from './select-words.mjs';
import { sentence_object } from './main.js';
import { user_interface } from './main.js';

export let tree_nodes_tosort = []; // Array to store tree nodes to sort
export let word_classes_tosort = []; // Array to store word classes to sort

export function assignClasses() {

	// Reset array to store every assigned node or class
	// These arrays are to ensure that each new node or class is unique
	let tree_nodes_assigned = [];
	let word_classes_assigned = [];

	// Assign nodes or classes based on user option
	// Reset array for nodes or classes to sort
	// Restore array for nodes or classes to sort from current sentence_object
	// Restore array to store every assigned node or class
	if (user_interface === "make-trees") {
		tree_nodes_tosort.length = 0;
		let tree_nodes = Object.keys(sentence_object.nodes);
		let all_node_indices = Object.values(sentence_object.nodes);

		if (tree_nodes.length > 0) {
			for (let i = 0; i < tree_nodes.length; i++) {
				tree_nodes_tosort.push([tree_nodes[i], all_node_indices[i]]);
				tree_nodes_assigned.push(i);
			}
		}
	}

	if (user_interface === "stage-sentences") {
		word_classes_tosort.length = 0;
		let word_classes = Object.keys(sentence_object.classes);
		let all_class_indices = Object.values(sentence_object.classes);

		if (word_classes.length > 0) {
			for (let i = 0; i < word_classes.length; i++) {
				word_classes_tosort.push([word_classes[i], all_class_indices[i]]);
				word_classes_assigned.push(i);
			}
		}
	}

	// Get indices of selected words
	// Get value(s) of selector buttons
	// Add node or class and indices to array to sort
	// Add node or class to array to store every assigned node or class
	// Assign tree_nodes or word_classes based on user option

	// make-trees interface, one selector at a time
	if (selected_indices.length > 0 && user_interface === "make-trees") {
		let tree_node_name = $(".selected").val();
		let tree_node_indices = [...selected_indices];
		let tree_node = tree_node_name + "-" + tree_nodes_assigned.length;
		tree_nodes_tosort.push([tree_node, tree_node_indices]);
		tree_nodes_assigned.push(tree_node);
		selected_indices.length = 0;
	}

	// stage-sentences interface, multiple selectors combined
	if (selected_indices.length > 0 && user_interface === "stage-sentences") {
		let selectors_selected = $(".selected").map(function () {
			return $(this).val();
		}).get();

		let word_class_name = selectors_selected.join("-");
		let word_class_indices = [...selected_indices];
		let word_class = word_class_name + "-" + word_classes_assigned.length;
		word_classes_tosort.push([word_class, word_class_indices]);
		word_classes_assigned.push(word_class);
		selected_indices.length = 0;
	}
}