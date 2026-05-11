// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to control stage-sentences interface

import $ from './jquery-cdn.js';
import { interface_list, user_interface, sentence_object } from './main.js';

export function loadStage (){
	$("#sentence-stager").show();
	$("#tree-maker").hide();

	if (sentence_object.words.length > 0) {
		$("#selector-container-stage").show();
		$("#selector-container-tree").hide();
	}
	
	$("#elements-selected-stage").show();
	$("#elements-selected-tree").hide();
	$("#selectors-category").removeClass("visible");

	let target_interface = interface_list.find(item => item.value === user_interface);
	let current_interface = target_interface.name;
	$("#current-interface").text(current_interface);

}