// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add elements to elements list
// Allows user to edit any label in elements list

import $ from './jquery-cdn.js';
import {bracketWrapper,sentence_object} from './main.js';
import {brackets_added} from './add-brackets.mjs'
import { deleteElement } from './delete-element.mjs';
import { changeElementLabel } from './change-element-label.mjs';

export function updateElements () {
	
	// Reset element list, reloads with each change
	$("#element-list").empty();
	
	// Reveal element list instructions if classes exist
	// Hide element list if no classes exist
	if(Object.keys(sentence_object.c).length > 0){
		$("#element-list-instructions").show();
		$("#parser-help").show().text("* Click on an element to add function or node arrow")
	}else{
		$("#element-list-instructions").hide();
		$("#parser-help").hide();
	}

	function getWordsByClass (word_class){
		let words = "";
		$(".sent-word."+$.escapeSelector(word_class)).each(function(){
			let word = $(this).text()+" ";
			words = words + word;
		})
		return words;
	}

	// Loop through any classes in sentence_object
	for (let i=0; i<Object.keys(sentence_object.c).length; i++){
		let element_class = Object.keys(sentence_object.c)[i];
		
		let $delete_element = $("<span/>", {
				"id": "delete-element-" + i,
				"class": "delete-element " + element_class,
				"title": "delete this element!",
				text: "[ X ]"
		});

		let bracket_end_label = "";
		if (sentence_object.be[i]) {
			bracket_end_label = " ("+sentence_object.be[i]+")"
		}
		let $element = $('<span/>', {
				"id": "element-" + i,
				"class": "element " + element_class,
				"title": "change this label!",
				text: element_class.split("-")[0].substring(1) + " --> " + getWordsByClass(element_class) + bracket_end_label
			});
		
		$("#element-list").append($("<span/>", {"class": "element-wrapper", "id": "element-wrapper-"+i}));
		$("#element-wrapper-"+i).append($delete_element);
		$("#element-wrapper-"+i).append($element);
		$($delete_element).hover(function(){$(this).toggleClass("delete-highlight")});
		$($element).hover(bracketWrapper(i));
		$(document).on('click', "#delete-element-"+i, deleteElement(i));
		$(document).on('click', "#element-"+i, function (e){
			let x = e.pageX;
			let y = e.pageY;
			changeElementLabel(i,x,y)
		});
	} 

	// Make overlapping elements red to indicate problem
	$(".element").each(function (){
		if(brackets_added.length > 1){
			for (let i=0; i < brackets_added.length; i++){
				if($(this).hasClass(brackets_added[i][2]) && brackets_added[i][4] === "mistake"){
					$(this).addClass("mistake");
					$("#parser-help").hide();
					$("#parser-error").show().text("* You have crossing bracket sets.");
				}
			}
		}
	});
}
