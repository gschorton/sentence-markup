// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)
 
// Function to set visible filters based on markup in sentence list

import $ from './jquery-cdn.js';
import {sentence_object} from './main.js';
import {indexed_sentences} from './get-sentence-objects.mjs';
import {makePatternClass} from './filter-sentences.mjs'

export function setFilters(){
	
	// Filters to always show
	$("#already-marked").removeClass("hide-this").show();
	$("label[for=already-marked]").removeClass("hide-this").show();
	$("#sen-len-min").removeClass("hide-this").show();
	$("#sen-len-max").removeClass("hide-this").show();
	$("#sen-pun-inp").removeClass("hide-this").show();
	$("#sen-wor-inp").removeClass("hide-this").show();
	$("#sen-str-inp").removeClass("hide-this").show();
	
	// Only look at the sentences with marked features
	// Using indexed_sentences due to added id
	$("#results-list .already-marked").each(function(){
		
		// Based on id, find particular sentence object
		let sentence_id = $(this).data("id");
		let sentence_type = indexed_sentences.find(item => item.id === sentence_id).type;
		let sentence_patterns = indexed_sentences.find(item => item.id === sentence_id).patterns;
		let sentence_classes_object = indexed_sentences.find(item => item.id === sentence_id).classes;
		let sentence_classes = Object.keys(sentence_classes_object).join(" ");
		
		// Check if each filter option has a value
		// that matches the marked sentence object
		$(".filter-option").each(function(){
			
			// Simple string match
			if(sentence_type === $(this).val()){
				let element_id = $(this).attr("id");
				$("label[for="+element_id+"]").removeClass("hide-this").show();
				$(this).removeClass("hide-this").show();
			}
			
			// Check for any values in the array
			if(sentence_patterns.some(item => $(this).val().includes(item))){
				let element_id = $(this).attr("id");
				$("label[for="+element_id+"]").removeClass("hide-this").show();
				$(this).removeClass("hide-this").show();
			}

			// Check for substring match but exclude elements
			// with integer as value to avoid false match
			if(sentence_classes.includes($(this).val())){
				if(!$(this).hasClass("fil-sen-pat")){
					let element_id = $(this).attr("id");
					$("label[for="+element_id+"]").removeClass("hide-this").show();
					$(this).removeClass("hide-this").show();				
				}
			}

			// Get regex to test string with wildcards
			if(makePatternClass($(this).val()).test(sentence_classes)){
				let element_id = $(this).attr("id");
				$("label[for="+element_id+"]").removeClass("hide-this").show();
				$(this).removeClass("hide-this").show();
			}
		});		
	});
	
	// Hide the menu button for any category of with no features to filter
	if ($(".filter-option.fil-wor-nou").not(".hide-this").length === 1) {
		$("button.fil-wor-nou").hide();
	}

	if ($(".filter-option.fil-wor-pro").not(".hide-this").length === 1) {
		$("button.fil-wor-pro").hide();
	}

	if ($(".filter-option.fil-wor-ver").not(".hide-this").length === 1) {
		$("button.fil-wor-ver").hide();
	}

	if ($(".filter-option.fil-wor-adj").not(".hide-this").length === 1) {
		$("button.fil-wor-adj").hide();
	}

	if ($(".filter-option.fil-wor-adv").not(".hide-this").length === 1) {
		$("button.fil-wor-adv").hide();
	}

	if ($(".filter-option.fil-phr-pre").not(".hide-this").length === 1) {
		$("button.fil-phr-pre").hide();
	}

	if ($(".filter-option.fil-phr-par").not(".hide-this").length === 1) {
		$("button.fil-phr-par").hide();
	}

	if ($(".filter-option.fil-phr-ger").not(".hide-this").length === 1) {
		$("button.fil-phr-ger").hide();
	}

	if ($(".filter-option.fil-phr-inf").not(".hide-this").length === 1) {
		$("button.fil-phr-inf").hide();
	}

	if ($(".filter-option.fil-cla-nou").not(".hide-this").length === 1) {
		$("button.fil-cla-nou").hide();
	}

	if ($(".filter-option.fil-cla-adv").not(".hide-this").length === 1) {
		$("button.fil-cla-adv").hide();
	}

	if ($(".filter-option.fil-cla-adj").not(".hide-this").length === 1) {
		$("button.fil-cla-adj").hide();
	}
}

