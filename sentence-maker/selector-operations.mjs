// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to set up selector operations

import { restoreSentenceMarkup } from "./restore-sentence-markup.mjs";
import { addFeatures } from "./add-features.mjs";
import { assignFeatures } from "./assign-features.mjs";
import { selected_indices } from "./select-words.mjs";

export function selectorOperations() {

	/* Both interfaces */
	$(document).on('click', '.selectors-sen-typ', function () {
		$(".selectors-sen-typ").removeClass("sen-selected");
		$(this).addClass("sen-selected");
	});

	$(document).on('click', '#selector-sen-submit-button', function () {
		addFeatures();
		$(".jquery-modal.blocker.current").removeClass("sent-type-pattern");
		$.modal.close();

		// reset and hide selector buttons if interrupting
		$(".selected").removeClass("selected");
		$(".selectors").removeClass("visible");

	});

	// bind buttons for sentence type and pattern
	$(document).on('click', '#assign-sent-features', function (e) {
		let x = e.pageX;
		let y = e.pageY;
		assignFeatures(x, y);
	});

/* make-trees */
	// Bind each selector to add class to selected words
	$(document).on('click', '.selector', function () {
		$(".selector").removeClass("selected");
		$(this).addClass("selected");

		if (selected_indices.length > 0) {
			restoreSentenceMarkup();
		}
		$(".selector").removeClass("selected");
	});

/* stage-sentences */
	// bind selector buttons to assign classes to selected words	
	$(document).on('click', ".selectors-category", function () {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		$("#selectors-word-type, #selectors-function, #selectors-phrase-type, #selectors-clause-type, #selectors-pattern, #selector-submit-button").removeClass("visible");
		if ($("#selector-wor").hasClass("selected")) {
			$("#selectors-word-type").addClass("visible");
		};
		if ($("#selector-phr.selected").hasClass("selected")) {
			$("#selectors-phrase-type").addClass("visible");
		};
		if ($("#selector-cla.selected").hasClass("selected")) {
			$("#selectors-clause-type").addClass("visible");
		};
	});

	$(document).on('click', ".selectors-word-type", function () {
		$(".selectors-word-type, .selectors-function").removeClass("selected");
		$(this).addClass("selected");
		$(".selectors-function").removeClass("visible");
		var function_class = $(this).attr("class").split(" ")[0];
		$("." + function_class).addClass("visible");
		$("#selector-submit-button").removeClass("visible");
		$("#selectors-function").addClass("visible");
	});

	$(document).on('click', ".selectors-phrase-type", function () {
		$(".selectors-phrase-type, .selectors-function, .selectors-pattern").removeClass("selected");
		$(this).addClass("selected");
		$(".selectors-function").removeClass("visible");
		var function_class = $(this).attr("class").split(" ")[0];
		$("." + function_class).addClass("visible");
		$("#selectors-pattern").removeClass("visible");
		$("#selectors-function").addClass("visible");
	});

	$(document).on('click', ".selectors-clause-type", function () {
		$(".selectors-clause-type, .selectors-function, .selectors-pattern").removeClass("selected");
		$(this).addClass("selected");
		$(".selectors-function").removeClass("visible");
		var function_class = $(this).attr("class").split(" ")[0];
		$("." + function_class).addClass("visible");
		$("#selectors-pattern").removeClass("visible");
		$("#selectors-function").addClass("visible");
	});

	$(document).on('click', ".selectors-function", function () {
		$(".selectors-function, .selectors-pattern").removeClass("selected");
		$(this).addClass("selected");
		if ($("#selector-phr-pre").hasClass("selected") || $("#selector-wor").hasClass("selected")) {
			$("#selector-submit-button").addClass("visible");
		} else {
			$("#selector-submit-button").removeClass("visible");
			$("#selectors-pattern").addClass("visible");
		}
	});

	$(document).on('click', ".selectors-pattern", function () {
		$(".selectors-pattern").removeClass("selected");
		$(this).addClass("selected");
		$("#selector-submit-button").addClass("visible");
	});

	// add and load classes for selected words
	$(document).on('click', ".selector-submit-button", function () {
		restoreSentenceMarkup();

		// reset and hide selector buttons after submitting selectors
		$(".selected").removeClass("selected");
		$(".selectors").removeClass("visible");
	});
}