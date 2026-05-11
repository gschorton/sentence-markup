// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to sort classes into new array based on
// first index, then string, then length before reloading

import $ from './jquery-cdn.js';
import { word_classes_tosort, tree_nodes_tosort } from './assign-classes.mjs'
import { user_interface } from './main.js';

export let word_classes_sorted = [];
export let tree_nodes_sorted = [];

export function sortClasses() {

	if (user_interface === "make-trees") {
		tree_nodes_sorted.length = 0;
		for (let i = 0; i < tree_nodes_tosort.length; i++) {
			tree_nodes_sorted.push([tree_nodes_tosort[i][0], tree_nodes_tosort[i][1]]);
		}

		// Sort tree_nodes by start index, then alpha, then length
		// Rename tree_nodes according to new sorted list
		if (tree_nodes_sorted.length > 0) {
			tree_nodes_sorted.sort((a, b) => (a[1][0] - b[1][0]) ||
				a[0].localeCompare(b[0]) ||
				b[1].length - a[1].length);

			for (let i = 0; i < tree_nodes_sorted.length; i++) {
				tree_nodes_sorted[i][0] = tree_nodes_sorted[i][0].slice(0, tree_nodes_sorted[i][0].lastIndexOf("-")) + "-" + i;
			}
		}
		console.log("Number of classes sorted: " + tree_nodes_sorted.length);
	}

	if (user_interface === "stage-sentences") {
		word_classes_sorted.length = 0;
		for (let i = 0; i < word_classes_tosort.length; i++) {
			word_classes_sorted.push([word_classes_tosort[i][0], word_classes_tosort[i][1]]);
		}

		// Sort word_classes by length
		// Rename tree_nodes according to new sorted list
		if (word_classes_sorted.length > 0) {
			word_classes_sorted.sort((a, b) => a[1][0] - b[1][0] || b[1].length - a[1].length);
		}

		// Rename classes according to new sorted list
		for (let i = 0; i < word_classes_sorted.length; i++) {
			word_classes_sorted[i][0] = word_classes_sorted[i][0].slice(0, word_classes_sorted[i][0].lastIndexOf("-")) + "-" + i;
		}
		console.log("Number of classes sorted: " + word_classes_sorted.length);
	}
}