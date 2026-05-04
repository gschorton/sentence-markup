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
import { addFeatures } from './add-features.mjs';
import { assignSentenceFeatures } from './assign-sentence-features.mjs';

$(document).ready(function () {

	// Placeholder for future DOM control
/* 	$("#code-generator-tree").load("dom-blocks/code-generator-tree.html");
	$("#code-generator-exhibit").load("dom-blocks/code-generator-exhibit.html");
	$("#sent-type-pattern").load("dom-blocks/sent-type-pattern.html");
	$("#tree-maker").load("dom-blocks/tree-maker.html"); 
	$("#feature-exhibit").load("dom-blocks/feature-exhibit.html"); 
	$("#filters").load("dom-blocks/filters.html");
	$("#sentence-input-options").load("dom-blocks/sentence-input-options.html");  */

	// Activate mouse selection in markup space	
	selectWords();
	
	// Bind buttons to create, load, and save sentences
	$(document).on('click', '#load-button', function(){
		createSentenceObject();
		loadSentenceObject(sentence_object);
	});

	$(document).on('click', '#get-json', function(){
		getJsonFilelist();
	});

	$(document).on('click', '#save-current-sentence', function(){
		saveCurrentSentence();
	});

	// Bind button to download active sentences from session
	$(document).on('click', '#save-json', function(){
		downloadJSON();
	});

	// bind buttons for sentence type and pattern
	$(document).on('click', '#assign-sent-features', function(e) {
		let x = e.pageX;
		let y = e.pageY;
		assignSentenceFeatures(x,y);
	});

	$(document).on('click', '.selectors-sen-typ', function() {
		$(".selectors-sen-typ").removeClass("sen-selected");
		$(this).addClass("sen-selected");	
	});
	
	$(document).on('click', '#selector-sen-submit-button', function() {
		clearSelection();			// clear mouse selection in window
		addFeatures();

		// reset and hide selector buttons if interrupting
		$(".selected").removeClass("selected");
		$(".selectors").removeClass("visible");

		$(".jquery-modal.blocker.current").removeClass("sent-type-pattern");
        $.modal.close();

		restoreSentenceMarkup();	// do all steps to refresh sentence object and DOM
	});	

	// Bind each selector to add class to selected words
	$(document).on('click', '.selector', function () {
		$(".selector").removeClass("selected");
		$(this).addClass("selected");

		if (selected_indices.length > 0) {
			restoreSentenceMarkup();
		}
		$(".selector").removeClass("selected");
	});

	// Binding to prevent refresh when clicking away from input
	$(document).on('change blur', '#sen-str-inp', function (e) {
		e.preventDefault();
	});

	$(document).on('change blur', '#sen-wor-inp', function (e) {
		e.preventDefault();
	});

	$(document).on('change blur', '#sen-pun-inp', function (e) {
		e.preventDefault();
	});

	// Bind show-hide button to toggle bracket visibility
	$(document).on('click', '#show-hide-brackets', function () {
		if ($('#show-hide-brackets').text() === "Show brackets") {
			$('#show-hide-brackets').text("Hide brackets");
			$('.bracket').show();
		} else if ($('#show-hide-brackets').text() === "Hide brackets") {
			$('#show-hide-brackets').text("Show brackets");
			$('.bracket').hide();
		}
	});

	// Bind filter buttons to respective actions
	$(document).on('click', '.filter-option-reset', function () {
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
		renderList(indexed_sentences);
	});

	$(document).on('click', '#filter-option-submit', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('click', '#button-len', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('click', '#button-wor', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('click', '#button-str', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('click', '#button-pun', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('change', '.filter-option', function () {
		$("#filter-option-submit-feedback").text("New filters waiting . . .").removeClass().addClass("needs-update");
	});

	// Controls for filter options menu
	$(document).on('click', '.menu-toggle', function (e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).next("span").toggleClass("visible");

	// Toggle the current menu
		$(this).next('.submenu').slideToggle();
		$(this).parent().next('.submenu').slideToggle();
		$(this).next('.submenu1').slideToggle();
	});

	// Default menu arrangement
	// Make sure happens after DOM load
	setTimeout(() => {
	$('.submenu').slideToggle();
	$('.menu-toggle-top').toggleClass("active");
	$('.fil-sen-wor-opt, .fil-sen-str-opt, .fil-sen-pun-opt').toggleClass("visible");
		
	}, 100);
});

// Construct sentence object:
export const sentence_object = {
	"id": "",	// ID added when loaded for session management
	"t": "",	// Text string representing type
	"p": [],	// Array of numbers for sentence patterns
	"w": [],	// Array of text strings for words
	"c": {},	// Nested object for classes (nameOfClass:indicesOfClass)
	"be": {}	// Nested object bracket-end arrow code (index:text)
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
