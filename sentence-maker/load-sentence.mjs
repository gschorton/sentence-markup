// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to reset and load sentence from sentence_object
// Gets words and unique classes from object and loads into DOM
// sentence_object has sorted classes (for proper bracket nesting)
// Common and general classes added but not stored in object
// Other formatting to make highlighting consistent and fluid

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {getClassesbyIndex} from './get-classes-by-index.mjs';
import {checkCurrentObjectChanges} from './check-current-object-changes.mjs'


export function loadSentence() {

	// Clear out sentence mark-up area
	$("#start-input").empty();
	$("#element-list-instructions").hide();
	$("#element-list").empty();
	$("#parser-help").hide();
	$("#parser-error").hide();
	$("#selector-container").show();

	// Add empty span to match data-id attribute of loaded sentence
	let $id_match = $('<span/>', {
		"data-id": sentence_object.id
	});
	
	$id_match.appendTo("#start-input"); 

	// Populate sentence mark-up area with spans containing all existing words and classes
	for (let i=0; i<sentence_object.w.length; i++){
		let $word = $('<span/>', {
			"class": getClassesbyIndex(i),
			"id": "sent-word-" + i,
			text: sentence_object.w[i]
		});

		let $space = $('<span/>', {
			text: " "
		});

		// Add generic class for all words
		// Add generic class for all spaces
		$word.appendTo("#start-input").addClass("sent-word selectable");
		$space.appendTo("#start-input").addClass("space");
	}

	$(".space").last().remove(); //remove last space

	// Move starting quote from word span to span right before word
	// Move any other punctuation mark from word span to a span right after the word
	// Makes highlighting look better when showing different elements
	// Punctuation marks stay with words in sentence_object
	$(".sent-word").each(function(){
		if($(this).text()[$(this).text().length-1] === "—"){
			$(this).next(".space").remove();
		}
		let originalText = $(this).text();
		let punctuation = originalText.replace(/[^.,\/#!?$%\^&\*;:{}=_—`~()“”]/g, "");
		let cleanText = originalText.replace(/[.,\/#!?$%\^&\*;:{}=_—`~()“”]/g, "");

		if(punctuation === "“"){
			$(this).before("<span class='punc'>" + punctuation + "</span>");
		}else if(punctuation != ""){
			$(this).after("<span class='punc'>" + punctuation + "</span>");				
		}

		$(this).text(cleanText);
	});

	// Check if sentence_object is original condition of brand new sentence
	// If so, clear out elements from the DOM when starting over
 	if (Object.keys(sentence_object.c).length < 1) {
		$("#element-list").empty();
		$("#show-hide-brackets").hide().text("Hide brackets");
	} 

	// Add classes to spaces and puncs between words with those classes
 	for (let i=0; i<Object.keys(sentence_object.c).length; i++){
		let word_class = Object.keys(sentence_object.c)[i];
		$('.space, .punc').each(function () {
			if($(this).prevAll(".sent-word").first().hasClass(word_class) && $(this).nextAll(".sent-word").first().hasClass(word_class)){
				$(this).addClass(word_class);
			}
		});
	}
	
	console.log("Sentence with id '"+sentence_object.id+"' loaded for markup.");
	console.log("Full sentence object: "+JSON.stringify(sentence_object));
	checkCurrentObjectChanges(sentence_object);
}