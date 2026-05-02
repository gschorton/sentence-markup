// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Collection of events and minor functions

import $ from './jquery-cdn.js';
import './pagination.js';
import { createSentenceObject } from './create-sentence-object.mjs';
import { selectWords, selected_indices } from './select-words.mjs';
import { loadSentenceObject } from './load-sentence-object.mjs';
import { filterSentences } from './filter-sentences.mjs';
import { renderList } from './render-list.mjs';
import { indexed_sentences } from './get-sentence-objects.mjs'
import { saveCurrentSentence, active_sentences } from './save-current-sentence.mjs';
import { downloadJSON } from './download-json.mjs';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';
import { getJsonFilelist } from './get-json-filelist.mjs';

$(document).ready(function () {

	// Bind buttons to create, load, and save sentences
	$('#load-button').on('click', function(){
		createSentenceObject();
		loadSentenceObject(sentence_object);
	});
	$('#get-json').click(getJsonFilelist);
	$('#save-current-sentence').click(saveCurrentSentence);

	// Bind button to download active sentences from session
	$("#save-json").click(downloadJSON);

	// Activate mouse selection in markup space	
	selectWords();

	// Bind each selector to add class to selected words
	$(".selector").each(function () {
		$(this).click(function () {
			$(".selector").removeClass("selected");
			$(this).addClass("selected");

			if (selected_indices.length > 0) {
				restoreSentenceMarkup();
			}
			$(".selector").removeClass("selected");
		});
	});

	// Binding to prevent refresh when clicking away from input
	$('#sen-str-inp').on('change blur', (function (e) {
		e.preventDefault();
	}));

	$('#sen-wor-inp').on('change blur', (function (e) {
		e.preventDefault();
	}));

	$('#sen-pun-inp').on('change blur', (function (e) {
		e.preventDefault();
	}));

	// Bind show-hide button to toggle bracket visibility
	$('#show-hide-brackets').on('click', function () {
		if ($('#show-hide-brackets').text() === "Show brackets") {
			$('#show-hide-brackets').text("Hide brackets");
			$('.bracket').show();
		} else if ($('#show-hide-brackets').text() === "Hide brackets") {
			$('#show-hide-brackets').text("Show brackets");
			$('.bracket').hide();
		}
	});

	// Bind filter buttons to respective actions
	$('.filter-option-reset').on('click', function () {
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
		renderList(indexed_sentences);
	});

	$('#filter-option-submit, #button-len, #button-wor, #button-str, #button-pun').on('click', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$('.filter-option').on('change', function () {
		$("#filter-option-submit-feedback").text("New filters waiting . . .").removeClass().addClass("needs-update");
	});

	// Controls for filter options menu
	$('.menu-toggle').click(function (e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).next("span").toggleClass("visible");

	// Toggle the current menu
		$(this).next('.submenu').slideToggle();
		$(this).parent().next('.submenu').slideToggle();
		$(this).next('.submenu1').slideToggle();
	});

	// Default menu arrangement
	$('.submenu').slideToggle();
	$('.menu-toggle-top').toggleClass("active");
	$('.fil-sen-wor-opt, .fil-sen-str-opt, .fil-sen-pun-opt').toggleClass("visible");
});

// Construct sentence object:
export const sentence_object = {
	"id": "",	// Get added when loaded for session management
	"t": "",	// Text string representing type
	"p": [],	// Array of numbers for sentence patterns
	"w": [],	// Array of text strings
	"c": {}		// nameOfClass:indicesOfClass
};

// Function to clear selected text
export function clearSelection() {
	if (window.getSelection) { window.getSelection().removeAllRanges(); }
	else if (document.selection) { document.selection.empty(); }
}

// Function to highlight words with set of brackets
// Also controls highlight in list of elements
export function bracketWrapper(j) {
	return function (event) {
		$(".element").each(function () {
			if ($(this).hasClass(Object.keys(sentence_object.c)[j])) {
				$(this).toggleClass("change-highlight");
			}
		});

		$(".sent-word, .space, .punc, .bracket").each(function () {
			if ($(this).hasClass(Object.keys(sentence_object.c)[j])) {
				$(this).toggleClass("highlighted");
			}
		});
	};
}

export function showFiltersUpdated() {
	return "Filters updated!";
}
