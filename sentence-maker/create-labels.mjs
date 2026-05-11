// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to create labels to appear above bracketed words

import $ from './jquery-cdn.js';
import { sentence_object, abbreviations } from './main.js';

export function createLabels() {
	$(".labels").remove();
	let word_classes = Object.keys(sentence_object.classes);
	for (let i = 0; i < word_classes.length; i++) {

		var label_abbs = word_classes[i].split("-");
		var label_abbs_category = label_abbs[0];
		var label_abbs_type = label_abbs[1];
		var label_abbs_function = label_abbs[2];
		var label_abbs_pattern = label_abbs[3];
		var label_type = "";
		var label_function = "";
		var label_pattern = "";

		for (let j = 0; j < abbreviations.length; j++) {
			if (abbreviations[j][0] == label_abbs_type) {
				label_type = abbreviations[j][2];
			} else if (abbreviations[j][0] == label_abbs_function) {
				label_function = abbreviations[j][2];
			} else if (abbreviations[j][0] == label_abbs_pattern) {
				label_pattern = abbreviations[j][2];
			}
		}

		if (label_abbs_category == "wor") {
			var $label = $('<div/>', {
				"id": "label-" + i,
				"class": "labels " + word_classes[i] + " " + word_classes[i].substr(0, 7),
				text: label_function,
			});
		} else if (label_abbs_type == "pre") {
			var $label = $('<div/>', {
				"id": "label-" + i,
				"class": "labels " + word_classes[i] + " " + word_classes[i].substr(0, 7),
				text: label_function,
			});
		} else {
			var $label = $('<div/>', {
				"id": "label-" + i,
				"class": "labels " + word_classes[i] + " " + word_classes[i].substr(0, 7),
				text: label_type + ", " + label_function + ", " + label_pattern,
			});
		}

		$("body").append($label);
	}
}