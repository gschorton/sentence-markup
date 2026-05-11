// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to select words in sentence to assign word classes
// Can drag to select/deselect multiple words: window.getSelection()
// Can click to select/deselect single words: .on('click')

import $ from './jquery-cdn.js';
import {clearSelection} from './main.js';

export let selected_indices = [];
export let indicesChanged = [];

export function selectWords() {

	// variables to prevent unwanted 'click' behavior
	let isDragging = false;

	// Makes sentence words clickable to select
	$(document).on('click', '.selectable', function () {

		// Allow "click" in case user dragged to select a range of words
		if (indicesChanged.length > 1) {
			isDragging = false;
		}

		// Prevent "click" from toggling in case user dragged to select only one word
		if (!isDragging) {
			$(this).toggleClass("ui-selected");

			// Reset indices before another fresh count
			selected_indices.length = 0;
			$('.sent-word.ui-selected').each(function () {
				selected_indices.push($(this).index(".selectable"));	// add word indices to selected_indices after selecting
			});
			console.log("after click: "+selected_indices);			
		}

		// Fill in spaces with ".ui-selected" between selected words, even with other spans between
		$('.space, .punc').each(function () {
			if($(this).prevAll(".sent-word").first().hasClass("ui-selected") && $(this).nextAll(".sent-word").first().hasClass("ui-selected")){
				$(this).addClass("ui-selected");
			}else{
				$(this).removeClass("ui-selected");
			}
		});

		// Each click, including the unwanted one, makes the next click possible
		isDragging = false;
		indicesChanged.length = 1;

		// Even the first click reveals the selector buttons
		$(".selected").removeClass("selected");					
		$(".selectors").removeClass("visible");
		$("#selectors-category").addClass("visible");
		
		// If click clears the last selected, class selectors disappear
		if($('.ui-selected').length === 0){
			$("#selectors-category").removeClass("visible");
		}
	});

	// Makes sentence words selectable with mouse drag
	$(document).on('mouseup keyup', '#start-input', function () {
		if (window.getSelection().toString().length > 0) {

			// Prevent unwanted click behavior
			isDragging = true;

			// Reset selected_indices before another fresh count
			// Reset indicesChanged in case user selects a range of words
			selected_indices.length = 0;
			indicesChanged.length = 0;

			// Reset all selected spans
			// Starting a new mouse drag select will start a new selection
			$(".ui-selected").removeClass("ui-selected");

			// Check which selectable spans are in the selection
			// Toggle class ".ui-selected" and capture number selected
			$('.selectable').each(function () {
				let $span = $(this)[0];
				let isT = window.getSelection().containsNode($span, true);
				if (isT) {
					$(this).toggleClass("ui-selected");
					indicesChanged.push($(this).index(".selectable"));
				}
			});

			// Add selected indices for assigning new class
			$('.sent-word.ui-selected').each(function () {
				selected_indices.push($(this).index(".selectable"));	// add word indices to selected_indices after selecting
			});

			// Fill in spaces and punctuation between selected words
			$('.space, .punc').each(function () {
				if($(this).prevAll(".sent-word").first().hasClass("ui-selected") && $(this).nextAll(".sent-word").first().hasClass("ui-selected")){
					$(this).addClass("ui-selected");
				}	// no else because each new mouse drag select will start a new selection
			});

			// Clear default highlight from window selection
			clearSelection();

			// reset selectors
			$(".selected").removeClass("selected");					
			$(".selectors").removeClass("visible");
			$("#selectors-category").addClass("visible");

			console.log("after drag: "+selected_indices);
		}
	});
}