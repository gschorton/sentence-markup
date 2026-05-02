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



/*	$span.attr('contenteditable', 'true').focus();
	$span.addClass("editable");
	//let currentText = $span.text();
	sentence_object.c[word_classes_sorted[i][0]] = word_classes_sorted[i][1];
	// Replace span content with an input field
	//let $input = $('<input type="text" />').val(currentText);
	//$span.html($input);
	//$input.focus();

	// When the user clicks away, save the new text
	$span.on('blur', function() {
		$span.attr('contenteditable', 'false');
		$span.removeClass("editable");
		sendSentence();
		updateElementLabel($span, i);
		//let newText = $(this).val();
		//$span.text(newText);
	}); */


/* export function updateElementLabel($span, j){
	$span.attr('contenteditable', 'false');
	
	let old_key =
	let new_key;

	if (old_key !== new_key) {
	Object.defineProperty(o, new_key,
		Object.getOwnPropertyDescriptor(o, old_key));
	delete o[old_key];
	}

	Object.keys(sentence_object.c)[j] = "b"+$span.text()+"-"+j;
	restoreSentenceMarkup();
//    $span.removeClass("editable");
} */