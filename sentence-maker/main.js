// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Collection of events and minor functions

import $ from './jquery-cdn.js';
import './pagination.js';
import { selectWords } from './select-words.mjs';
import { filterOperations } from './filter-operations.mjs';
import { selectorOperations } from './selector-operations.mjs';
import { createSentenceObject } from './create-sentence-object.mjs';
import { getJsonFilelist } from './get-json-filelist.mjs';
import { saveCurrentSentence } from './save-current-sentence.mjs';
import { downloadJSON } from './download-json.mjs';
import { shiftLabelPosition } from './shift-label-position.mjs';
import { loadTree } from './load-tree.mjs';
import { loadStage } from './load-stage.mjs';
import { loadSentenceObject } from './load-sentence-object.mjs';
import { getSentenceObjects } from './get-sentence-objects.mjs';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

$(document).ready(function () {

	// Initialize interface
	manageInterface (user_interface);

	// Activate mouse selection in markup space	
	selectWords();

	// Settings for filters
	filterOperations();
	
	// Settings for selectors
	selectorOperations();

	// Set up interface option select
	let $interface_options = $('#interface-options');
	$interface_options.append('<option selected="true" disabled>Change Interface</option>');

	// Get interface options from interface_list object
	$.each(interface_list, function (key, entry) {
		$interface_options.append($('<option></option>')
			.attr('value', entry.value)
			.text(entry.name));
	});

	// Bind interface select to control interface
 	$(document).on('change','#interface-options', function() {
		user_interface = $(this).val();
		$(this).blur();
		manageInterface (user_interface);
	});

	// Bind file select to load sentences
	$(document).on('change','#file-options', function() {
		let selected_file = $(this).val();
		getSentenceObjects(selected_file);
	});

	// Bind button to create sentences
	$(document).on('click', '#load-button', function(){
		createSentenceObject();
	});

	// Bind button to load existing sentences
	$(document).on('click', '#get-json', function(){
		if ($('#file-options option').length < 1) {
			getJsonFilelist();
		}
		$('#find-sentence').modal();
	});

	// Bind button to save sentences
	$(document).on('click', '#save-current-sentence', function(){
		saveCurrentSentence();
	});

	// Bind button to download active sentences in session
	$(document).on('click', '#save-json', function(){
		downloadJSON();
	});

	// Bind show-hide button to toggle bracket visibility
	$(document).on('click', '#show-hide-brackets', function () {
		if ($('#show-hide-brackets').text() === "Show brackets") {
			$('#show-hide-brackets').text("Hide brackets");
			$('.bracket-tree').show();
		} else if ($('#show-hide-brackets').text() === "Hide brackets") {
			$('#show-hide-brackets').text("Show brackets");
			$('.bracket-tree').hide();
		}
	});

	// Bind bracket buttons to click function to toggle brackets and highlighting
	for (let i=0;i < bracket_classes.length; i++){
		$("#"+bracket_classes[i][1]).click(bracketHandler(i));
		$("#"+bracket_classes[i][1]).hover(allBracketLabelHandler(i));
	}

	// Bind controls to show and hide word classes
	$("#verbal-types").click(showVerbalBrackets());
	$("#verbal-types").hover(showVerbalLabels());
	$("#clause-types").click(showClauseBrackets());
	$("#clause-types").hover(showClauseLabels());
	$("#all-types").click(showAllBrackets());
	$("#all-types").hover(showAllLabels());
	$("#no-types").click(hideAllBrackets());

});

// Store user interface
// This variable determines sentence markup that loads
// and the sentence display (tree maker or sentence stager)
// Default is "make-trees"
export let user_interface = "make-trees";

// Construct interface object for user options
export let interface_list = [
	{
	"name": "Tree Maker",
	"value": "make-trees"
	},
	{
	"name": "Sentence Stager",
	"value": "stage-sentences"
	}
];

// Construct sentence object for either interface
export const sentence_object = {
	"id": "",	// String added for session management
	"type": "",	// String representing sentence type
	"patterns": [],	// Array of numbers for sentence patterns
	"words": [],	// Array of strings for sentence words
	"classes": {},	// Nested object for word classes (nameOfClass:indicesOfClass)
	"nodes": {},	// Nested object for tree nodes (nameOfNode:indicesOfNode)
	"arrows": {}	// Nested object for tree arrows (index:text)
};

// Function to clear selected text
export function clearSelection() {
	if (window.getSelection) { window.getSelection().removeAllRanges(); }
	else if (document.selection) { document.selection.empty(); }
}

// Function to manage interface settings
// Called whenever interface changes
export function manageInterface(value) {
	if (value === "make-trees") {
		loadTree();
	}else if (value === "stage-sentences") {
		loadStage();
	}

	if (sentence_object.words.length > 0) {
		restoreSentenceMarkup();
	}
}

// Function to highlight words with set of brackets
// Also controls highlight in list of elements
export function bracketWrapper(j) {
	let tree_node = Object.keys(sentence_object.nodes)[j];
	let word_class = Object.keys(sentence_object.classes)[j];
	return function (event) {
		$(".element-tree").each(function () {
			if ($(this).hasClass(tree_node)) {
				$(this).toggleClass("change-highlight");
			}
		});

		$(".element-stage").each(function () {
			if ($(this).hasClass(word_class)) {
				$(this).toggleClass("change-highlight");
			}
		});

		$(".sent-word, .space, .punc, .bracket-tree").each(function () {
			if ($(this).hasClass(tree_node) && user_interface === "make-trees") {
				$(this).toggleClass("highlighted");
			}
		});
		$(".sent-word, .space, .punc, .bracket-stage").each(function () {
			if ($(this).hasClass(word_class) && user_interface === "stage-sentences") {
				$(this).toggleClass("highlighted");
			}
		});
	};
}

export function showFiltersUpdated() {
	return "Filters updated!";
}

// Function to reset and hide bracket buttons
export function hideBracketButtons() {
	 $("#bracket-buttons").removeClass("visible");
	 $(".bracket-buttons").removeClass("visible");
}

// Function to reveal labels above words inside a set of brackets
export function revealLabel(j) {
	return function(event) {
		$("#label-"+j).toggleClass( "visible" );
	};
}

// Function to reveal all brackets around phrases and clauses
export function hideAllBrackets(){
	return function(event) {
		$(".bracket-buttons").removeClass("active");
		$(".bracket").removeClass("visible");
		shiftLabelPosition();
	};
}

// Function to reveal all brackets around phrases and clauses
export function showAllBrackets(){
	return function(event) {
		$(".bracket-buttons").removeClass("active");
		$(".bracket-buttons").addClass("active");
		$(".bracket").addClass("visible");
		shiftLabelPosition();
	};
}

// Function to reveal all labels of and highlight phrases and clauses
export function showAllLabels(){
	return function(event) {
		$("#sentence-stage .sent-word").not("span[class='sent-word selectable']").toggleClass("highlighted");
		$("#sentence-stage .space").not("span[class='space']").toggleClass("highlighted");
		$(".labels").toggleClass("visible");
	};
}

// Function to reveal all brackets around phrases and clauses
export function showVerbalBrackets(){
	return function(event) {
		$(".bracket").removeClass("visible");
		$(".bracket-buttons").removeClass("active");
		$("#participle, #gerund, #infinitive").addClass("active");
		$(".bracket.phr-par, .bracket.phr-ger, .bracket.phr-inf").addClass("visible");
		shiftLabelPosition();
	};
}

// Function to reveal all labels of and highlight phrases and clauses
export function showVerbalLabels(){
	return function(event) {
		$(".sent-word.phr-par, .sent-word.phr-ger, .sent-word.phr-inf").toggleClass("highlighted");
		$(".space.phr-par, .space.phr-ger, .space.phr-inf").toggleClass("highlighted");
		$(".labels.phr-par, .labels.phr-ger, .labels.phr-inf").toggleClass("visible");
	};
}

// Function to reveal all brackets around phrases and clauses
export function showClauseBrackets(){
	return function(event) {
		$(".bracket").removeClass("visible");
		$(".bracket-buttons").removeClass("active");
		$("#adverb, #adjective, #noun").addClass("active");
		$(".bracket.cla-adv, .bracket.cla-adj, .bracket.cla-nou").addClass("visible");
		shiftLabelPosition();
	};
}

// Function to reveal all labels of and highlight phrases and clauses
export function showClauseLabels(){
	return function(event) {
		$(".sent-word.cla-adv, .sent-word.cla-adj, .sent-word.cla-nou").toggleClass("highlighted");
		$(".space.cla-adv, .space.cla-adj, .space.cla-nou").not("span[class='space']").toggleClass("highlighted");
		$(".labels.cla-adv, .labels.cla-adj, .labels.cla-nou").toggleClass("visible");
	};
}

// Function to highlight words inside a set of brackets
export function allBracketLabelHandler(j) {
	return function(event) {
		$(".sent-word."+bracket_classes[j][0]+", .space."+bracket_classes[j][0]).toggleClass("highlighted");
		$(".labels."+bracket_classes[j][0]).toggleClass("visible");
	};
}

// Function to show/hide brackets for existing phrases/clauses using buttons
export function bracketHandler(j) {
	return function(event) {
		$(".bracket."+bracket_classes[j][0]).toggleClass("visible");
		$( this ).toggleClass("active");
		shiftLabelPosition();
	};
}

// Define global variables and arrays
export const bracket_classes = [			// Array to check for brackets with class [0] to reveal toggle button [1]
	["phr-pre", "prepositional"],
	["phr-par", "participle"],
	["phr-ger", "gerund"],
	["phr-inf", "infinitive"],
	["cla-adj", "adjective"],
	["cla-adv", "adverb"],
	["cla-nou", "noun"],
	["wor-nou", "word-noun"],
	["wor-pro", "word-pronoun"],
	["wor-ver", "word-verb"],
	["wor-adj", "word-adjective"],
	["wor-adv", "word-adverb"]
];
export const abbreviations = [				// Array to make elements list and labels based on selectors
	["wor", "word"],
	["phr", "phrase"],
	["cla", "clause"],
	["pre", "prepositional", ""],
	["par", "participle", "P"],
	["ger", "gerund", "G"],
	["inf", "infinitive", "I"],
	["adj", "adjective", "AJC"],
	["adv", "adverb", "AVC"],
	["nou", "noun", "NC"],
	["ver", "verb", ""],
	["pro", "pronoun", ""],
	["sub", "subject", "S"],
	["bvb", "\"to be\" verb", "BV"],
	["lvb", "linking verb", "LV"],
	["ivb", "intransitive action verb", "IV"],
	["tvb", "transitive action verb", "TV"],
	["avt", "adverb of time", "AdvT"],
	["avp", "adverb of place", "AdvP"],
	["pad", "predicate adjective", "PA"],
	["pno", "predicate nominative", "PN"],
	["dob", "direct object", "DO"],
	["iob", "indirect object", "IO"],
	["oca", "object complement adjective", "OCA"],
	["ocn", "object complement nominative", "OCN"],
	["maj", "modifier adjective", "AdjM"],
	["mav", "modifier adverb", "AdvM"],
	["obp", "object of preposition", "OP"],
	["one", "pattern 1", "1"],
	["two", "pattern 2", "2"],
	["thr", "pattern 3", "3"],
	["fou", "pattern 4", "4"],
	["fiv", "pattern 5", "5"],
	["six", "pattern 6", "6"],
	["sev", "pattern 7", "7"],
	["eig", "pattern 8", "8"],
	["nin", "pattern 9", "9"],
	["ten", "pattern 10", "10"]
];