// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to show user sentences saved in the session
// Click on saved sentence to reload it and make it "loaded"
// Keep track of array index in case of changes
// Or just load another one and discard changes

import $ from './jquery-cdn.js';
import {loadSentenceObject} from './load-sentence-object.mjs';

export function showActiveSentences (items) {
	
	// Reset active sentence list
	let active_sentence_list = [];
	$("#active-sentence-list").empty();

	// Build results display
	// Items come from active_sentences array
	for (let i=0; i<items.length; i++){
		let new_item = $( "<li/>", {
			"class": "sent-obj-active",
			"data-id": items[i].id,
			"data-active": i,
			text: items[i].w.join(" ")	// just to display the sentence
		});
		
		// Remove space after dash
		new_item.html(function(index, old_html){
			return old_html.replace(/—\s+/g, '—')
		});
		
		active_sentence_list.push(new_item);
	}

	$( "<span/>", {
		text: "Click on sentence to reopen in viewer:",
		id: "active-list-instructions"
	}).appendTo( "#active-sentence-list" );

	$( "<div/>", {
		id: "display-active-list"
	}).appendTo( "#active-sentence-list" );

	$( "<ul/>", {
		id: "active-list"
	}).appendTo( "#display-active-list" );

	$('#active-list').append(active_sentence_list);	

 	// Assign "loaded" class to sentence currently loaded for markup
	if ($("#start-input span:first").data('id') !== undefined) {
		let data_id = $("#start-input span:first").data('id');
		$('.sent-obj-active[data-id='+data_id+']').addClass("loaded");
		$('.sent-obj[data-id='+data_id+']').addClass("loaded");
	} 

	// Bind click event for active list
	// .data() parses JSON strings into objects
	$('.sent-obj-active').on('click', function() {
		$(".loaded").removeClass("loaded");
		$(this).addClass("loaded");
		let data_id = $(this).data('id');
		$('.sent-obj[data-id='+data_id+']').addClass("loaded");
		let data = $(this).data("active");
		loadSentenceObject(items[data]);
	});

	$('.sent-obj-active[data-id*="new"]').addClass("sent-obj-new");
	$("#save-json").show();
}