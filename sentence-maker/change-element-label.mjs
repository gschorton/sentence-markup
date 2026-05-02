// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

export function changeElementLabel (i,x,y) {

	$('#change-element').empty();
	$('#change-element').modal();
	$(".jquery-modal.blocker.current").addClass("change-element");
	$('#change-element').css({
		'position': 'absolute',
		'top': y-30 + 'px',
		'left': x+100 + 'px',
	});

	let element_clicked = $("#element-"+i).text();
	let old_label = $(".bracket-start-"+i).text().split(" ")[0].substring(1);

	let $instructions = $("<span/>", {
		id:"change-label-instructions",
		text: "Change the label for \""+element_clicked+"\":"
	});

	let $input = $('<input>', {
		id: "change-label",
		type: 'text',
		name: 'dynamicInput',
	}).val(old_label);

	let $update = $('<button>', {
		id: "update-label",
		text: "Update label"
	});

	$("#change-element").append($instructions);
	$("#change-element").append($input);
	$("#change-element").append($update);
	$("#change-label").focus();

	$('#change-element').off('click').on('click', "#update-label", function(e) {
		e.preventDefault();
		let old_word_class = Object.keys(sentence_object.c)[i];
		let indices = Object.values(sentence_object.c)[i];
		let new_label = $("#change-label").val().trim();
		let new_word_class = old_word_class.replace(old_label, new_label);

		sentence_object.c[new_word_class] = indices;
		delete sentence_object.c[old_word_class];

		$(".jquery-modal.blocker.current").removeClass("change-element");
		$.modal.close();

		restoreSentenceMarkup();
	});
}