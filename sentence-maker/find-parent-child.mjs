// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)
// 
// Function to find parent-child relationships among classes in sentence_object

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';
import { user_interface } from './main.js';

export function findParentChild() {

	// Reset parents array
	let parents = [];
	let tree_nodes = [];
	let word_classes = [];
	let elements = [];

	// Create array from object for simple comparison of starting and ending index
	if (user_interface === "make-trees") {
		tree_nodes = Object.entries(sentence_object.nodes).map(([key, value]) => ({
			name: key,
			start: value[0],
			end: value[value.length - 1],
			length: value.length
		}));
		elements = [...tree_nodes];
	}

	if (user_interface === "stage-sentences") {
		word_classes = Object.entries(sentence_object.classes).map(([key, value]) => ({
			name: key,
			start: value[0],
			end: value[value.length - 1],
			length: value.length
		}));
		elements = [...word_classes];
	}

	// Show word_classes
	console.log(...elements);

	// Check if more than one element before doing loops
	// Double loop to control comparison of each
	// This will create duplicates in highly marked sentences
	// elements are already sorts by starting index and length
	// so only one condition to check if longer element contains shorter:
	// if "a" starts at or before "b" but contains all of "b"
	if (elements.length > 1) {
		for (let i = 0; i < elements.length - 1; i++) {
			for (let j = i + 1; j < elements.length; j++) {
				let a = elements[i];
				let b = elements[j];
				let indices_a = [];
				let indices_b = [];

				if (user_interface === "make-trees") {
					indices_a = sentence_object.nodes[a.name];
					indices_b = sentence_object.nodes[b.name];
					if (a.start <= b.start && indices_b.every(v => indices_a.includes(v))) {
						parents.push([a.name, b.name, a.start, a.length, ""]);
					}
				}

				if (user_interface === "stage-sentences") {
					indices_a = sentence_object.classes[a.name];
					indices_b = sentence_object.classes[b.name];
					if (a.start <= b.start && indices_b.every(v => indices_a.includes(v))) {
						parents.push([a.name, b.name, a.start, a.length, ""]);
					} else {
						parents.push([a.name, "", a.start, a.length, ""]);
						parents.push([b.name, "", b.start, b.length, ""]);
					}
				}
			}
		}
	} else if (elements.length === 1) {
		// Only element
		parents.push([elements[elements.length - 1].name,
			"",
		elements[elements.length - 1].start,
		elements[elements.length - 1].length,
			""
		]);
	}

	// Search for duplicates and blank them
	for (let i = 0; i < parents.length - 1; i++) {
		for (let j = i + 1; j < parents.length; j++) {
			let a = parents[i];
			let b = parents[j];
			if (a[0] === b[0] && a[3] > b[3]) {
				parents[i] = "";
			} else if (a[0] === b[0] && a[1] === "") {
				parents[i] = "";
			} else if (a[1] === b[1] && a[3] > b[3]) {
				parents[i] = "";
			}
		}
	}

	// Clear blank array items
	parents = parents.filter(Boolean);

	//	Sort by start index, might or might not be necessary
	parents.sort((a, b) => (a[2] - b[2]) ||
		a[1].localeCompare(b[1]) ||
		b[3].length - a[3].length);

	// Change child elements to "child"
	for (let i = 0; i < parents.length - 1; i++) {
		for (let j = i + 1; j < parents.length; j++) {
			let a = parents[i];
			let b = parents[j];
			if (a[1] === b[0]) {
				b[b.length-1] = "child";
			} else if (b[1] === a[0]) {
				a[a.length-1] = "child";
			}
		}
	}

	// Add "not-child" to every element not a child
	for (let i = 0; i < parents.length; i++) {
		if (parents[i][parents[i].length-1] != "child") {
			parents[i][parents[i].length-1] = "not-child";
		}
		var a = parents[i];
		console.log(a[0] + " is parent of " + a[1]);
	}

	console.log(...parents); //after determining parents
	return parents;

}