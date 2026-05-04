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
		'top': y-130 + 'px',
		'left': x+100 + 'px',
	});

	let element_clicked = $("#element-"+i).text();
	let old_label_start = $(".bracket-start-"+i).text().split(" ")[0].substring(1);
	let old_label_end = $(".bracket-end-"+i).text().replace("]","").trim();

	let $instructions = $("<span/>", {
		id:"change-label-instructions",
		html: "<b>First box</b> to add function to node label (type \"^subj\" or \"_subj\").<br /><b>Second box</b> to add node arrow (type \"->2\" or \"<-1\" or \"<>3\")"
	});

	let $input_start = $('<input>', {
		id: "change-label-start",
		type: 'text',
	}).val(old_label_start);

	let $input_end = $('<input>', {
		id: "change-label-end",
		type: 'text',
		"placeholder": "Type code like \"->2\""
	}).val(old_label_end);

	let $update = $('<button>', {
		id: "update-label",
		text: "Update label"
	});

	$("#change-element").append($instructions);
	$("#change-element").append($input_start);
	$("#change-element").append($input_end);
	$("#change-element").append($update);
	$("#change-label-start").focus();

	$(document).off('click', "#update-label").on('click', "#update-label", function(e) {
		e.preventDefault();
		let old_word_class = Object.keys(sentence_object.c)[i];
		let indices = Object.values(sentence_object.c)[i];
		let new_label_start = $("#change-label-start").val().trim();
		let new_label_end = $("#change-label-end").val().trim();
		let new_word_class = old_word_class.replace(old_label_start, new_label_start);

		if(new_word_class != old_word_class){
			sentence_object.c[new_word_class] = indices;
			delete sentence_object.c[old_word_class];
		}

		if(new_label_end === ""){
			delete sentence_object.be[i];
		}else if(new_label_end != old_label_end){
			sentence_object.be[i] = new_label_end;
		}

		$(".jquery-modal.blocker.current").removeClass("change-element");
		$.modal.close();

		restoreSentenceMarkup();
	});
}