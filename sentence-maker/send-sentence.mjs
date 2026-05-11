// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to send coded sentence to tree maker

import $ from './jquery-cdn.js';
import { sentence_object, user_interface } from './main.js';

export function sendSentence() {

	// Send sentence based on user option
	if (user_interface === "make-trees") {
		if (Object.keys(sentence_object.nodes).length > 0) {
			let sentence_coded = $("#start-input").clone();
			sentence_coded.find(".punc").last().remove();
			let sentence_ready = sentence_coded.text();
			$("#code").val('').blur();
			$("#code").val(sentence_ready).trigger('input');
		}
	}

	if (user_interface === "stage-sentences") {
		if (Object.keys(sentence_object.classes).length > 0) {
			$("#sentence-stage").html($("#start-input").html());
			$('#sentence-stage .sent-word').removeClass('selectable');
			$('#sentence-stage span').first().remove();
			$('#start-input .sent-word').attr('class', 'sent-word selectable');
			$('#start-input .space').attr('class', 'space');
			$('#start-input .punc').attr('class', 'punc');
			$('#start-input .bracket').remove();

			// Wrap brackets and words to prevent line breakage
			// Forwards from bracket-start, backwards from bracket-end
			$(".bracket-start").each(function () {
				if ($(this) === $(".bracket-start").first() || !$(this).prev("span").hasClass("bracket-start")) {
					$(this)
						.nextUntil($(this).nextAll('.sent-word:first'))
						.addBack()         // Includes the start span
						.add($(this).nextAll('.sent-word:first'))  // Includes the end span
						.wrapAll('<span class="prevent-wrap"></span>');
				}
			});

			$(".bracket-end").each(function () {
				if ($(this) === $(".bracket-end").last() || !$(this).next("span").hasClass("bracket-end")) {
					$(this)
						.prevUntil($(this).prevAll('.sent-word:first'))
						.addBack()         // Includes the start span
						.add($(this).prevAll('.sent-word:first'))  // Includes the end span
						.wrapAll('<span class="prevent-wrap"></span>');
				}
			});
		}
	}
}