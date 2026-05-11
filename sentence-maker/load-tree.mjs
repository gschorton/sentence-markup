// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to control make-trees interface

import $ from './jquery-cdn.js';
import { interface_list, sentence_object, user_interface } from './main.js';

export function loadTree() {
	$("#sentence-stager").hide();
	$("#tree-maker").show();

	if (sentence_object.words.length > 0) {
		$("#selector-container-stage").hide();
		$("#selector-container-tree").show();
	}

	$("#elements-selected-stage").hide();
	$("#elements-selected-tree").show();

	let target_interface = interface_list.find(item => item.value === user_interface);
	let current_interface = target_interface.name;
	$("#current-interface").text(current_interface);

}