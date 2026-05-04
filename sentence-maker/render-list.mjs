// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to render list of filtered sentence objects
// Main display and filtering display both update the same

import $ from './jquery-cdn.js';
import {showFiltersUpdated} from './main.js';
import {loadSentenceObject} from './load-sentence-object.mjs';
import {indexed_sentences} from './get-sentence-objects.mjs';

export function renderList(items) {
	
	let feedback = showFiltersUpdated();
	$("#find-sentence #filter-results").empty();
	$("#sentence-list").empty();
	let sentence_filter_results = [];
	let sentence_filter_main = [];

	// Build results display from "items" passed in
	// Loops through to build and push 
	for (let i=0; i<items.length; i++){
		let marked_sentence = "";
		if(Object.keys(items[i].c).length > 0){
			marked_sentence = "already-marked";
		}
		let new_item = $( "<li/>", {
			"class": "sent-obj " + marked_sentence,
			"data-id": items[i].id,					// get index of original object
			"data-filtered": i,						// set id of filtered set
			text: items[i].w.join(" ")				// just to display the sentence
		});
		new_item.html(function(index, old_html){
			return old_html.replace(/—\s+/g, '—')
		});
		sentence_filter_results.push(new_item);
	}

	$( "<p/>", {
		text: "Showing " + sentence_filter_results.length +" of "+ indexed_sentences.length +" sentences",
	}).appendTo( "#find-sentence #filter-results" );		
		
	$( "<div/>", {
		id: "paginate-results"
	}).appendTo( "#find-sentence #filter-results" );

	$( "<p/>", {
		text: "Click on sentence to open in viewer:",
		id: "results-instructions"
	}).appendTo( "#find-sentence #filter-results" );

	$( "<div/>", {
		id: "display-results"
	}).appendTo( "#find-sentence #filter-results" );

	$( "<ul/>", {
		id: "results-list"
	}).appendTo( "#display-results" );

	// Pagination
	$('#paginate-results').pagination({
		dataSource: sentence_filter_results,
		callback: function(data, pagination) {
			// template method of yourself
			$('#results-list').html(data);
		}
	})

	if(sentence_filter_results.length < 10){
		$("#paginate-results").hide();
	}

	if(sentence_filter_results.length < 1){
		$("#paginate-results, #results-instructions").hide();
	}
	
	// Assign "loaded" class to sentence currently loaded for markup
	if ($("#start-input span:first").data('id') != undefined) {
		let data_id = $("#start-input span:first").data('id');
		$('.sent-obj[data-id='+data_id+']').addClass("loaded");
	}
	
	// Bind click event for both lists
	$(document).on('click', '.sent-obj', function() {
		$(".loaded").removeClass("loaded");
		$('[data-id='+$(this).data("id")+']').addClass("loaded");
		let data = $(this).data("filtered"); // Automatically parses JSON strings into objects
		loadSentenceObject(items[data]);
	});
	
	console.log("Found "+sentence_filter_results.length+" of "+ indexed_sentences.length +" sentences.");

}