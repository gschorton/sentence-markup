// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to add elements to elements list
// Allows user to edit any label in elements list

import $ from './jquery-cdn.js';
import { bracketWrapper, sentence_object, revealLabel, abbreviations, user_interface } from './main.js';
import { brackets_added } from './add-brackets.mjs'
import { deleteElement } from './delete-element.mjs';
import { changeElementLabel } from './change-element-label.mjs';
import { findParentChild } from './find-parent-child.mjs';

export let parents = [];

export function updateElements () {
	
	// Reset element list, reloads with each change
	$("#element-list-tree").empty();
	$("#element-list-stage").empty();

	// Get parents array for nested elements in Sentence Stager
	if (user_interface === "stage-sentences") {
		parents = findParentChild();
	}
	
	// Reveal element list instructions if classes exist
	// Hide element list if no classes exist
	let word_classes = Object.keys(sentence_object.classes);
	let tree_nodes = Object.keys(sentence_object.nodes);


	if(tree_nodes.length > 0 && user_interface === "make-trees"){
		$(".element-list-instructions").show();
		$(".parser-help").show().text("* Click on an element to add function or node arrow")
	}else if(word_classes.length > 0 && user_interface === "stage-sentences"){
		$(".element-list-instructions").show();
	}else{
		$(".element-list-instructions").hide();
		$(".parser-help").hide();
	}

	function getWordsByClass (tree_node){
		let words = "";
		$(".sent-word."+$.escapeSelector(tree_node)).each(function(){
			let word = $(this).text() + " ";
			words = words + word;
		})
		return words;
	}

	// Loop through any nodes in sentence_object
	if (user_interface === "make-trees") {
		for (let i = 0; i < tree_nodes.length; i++) {
			let tree_node = tree_nodes[i];
			let element_id = tree_nodes[i].split('-').pop();

			let $delete_element = $("<span/>", {
				"id": "delete-element-tree-" + element_id,
				"class": "delete-element-tree " + tree_node,
				"title": "delete this element!",
				text: "[ X ]"
			});

			let tree_arrow = "";
			if (sentence_object.arrows[element_id]) {
				tree_arrow = " (" + sentence_object.arrows[element_id] + ")"
			}

			let $element = $('<span/>', {
				"id": "element-tree-" + element_id,
				"class": "element-tree " + tree_node,
				"title": "change this label!",
				text: tree_node.split("-")[0].substring(1) + " --> " + getWordsByClass(tree_node) + tree_arrow
			});

			let $element_wrapper = $('<span/>', {
				"id": "element-wrapper-tree-" + i,
				"class": "element-wrapper-tree"
			});

			// Add parents and children to elements list
			$("#element-list-tree").append($element_wrapper);
			$("#element-wrapper-tree-" + i).append($delete_element);
			$("#element-wrapper-tree-" + i).append($element);
			$($delete_element).hover(function () { $(this).toggleClass("delete-highlight") });
			$($element).hover(bracketWrapper(i));
			$(document).off('click', "#delete-element-tree-" + i).on('click', "#delete-element-tree-" + i, deleteElement(i));
			$(document).off('click', "#element-tree-" + i).on('click', "#element-tree-" + i, function (e) {
				let x = e.pageX;
				let y = e.pageY;
				changeElementLabel(i, x, y)
			});
		}
	}

	// Loop through any nodes in sentence_object
	if (user_interface === "stage-sentences") {
		for (let i = 0; i < parents.length; i++) {
			let element_class = parents[i][0];
			let element_abbs = parents[i][0].split("-");
			let element_abbs_category = element_abbs[0];
			let element_abbs_type = element_abbs[1];
			let element_abbs_function = element_abbs[2];
			let element_abbs_pattern = element_abbs[3];
			let element_category = "";
			let element_type = "";
			let element_function = "";
			let element_pattern = "";
			let $element;

			for (let j = 0; j < abbreviations.length; j++) {
				if (abbreviations[j][0] === element_abbs_category) {
					element_category = abbreviations[j][1];
				} else if (abbreviations[j][0] === element_abbs_type) {
					element_type = abbreviations[j][1];
				} else if (abbreviations[j][0] === element_abbs_function) {
					element_function = abbreviations[j][1];
				} else if (abbreviations[j][0] === element_abbs_pattern) {
					element_pattern = abbreviations[j][1];
				}
			}

			// Element list can be in order of word index instead sorted classes
			let element_id = parents[i][0].split('-').pop();

			let $delete_element = $("<span/>", {
				"id": "delete-element-stage-" + element_id,
				"class": "delete-element-stage " + element_class,
				"title": "delete this element!",
				text: "[ X ]",
			});

			if (element_abbs_category == "wor") {
				$element = $('<span/>', {
					"id": "element-stage-" + element_id,
					"class": "element-stage " + element_class,
					text: element_type + ", " + element_function,
				});
			} else if (element_abbs_type == "pre") {
				$element = $('<span/>', {
					"id": "element-stage-" + element_id,
					"class": "element-stage " + element_class,
					text: element_type + " " + element_category + ", " + element_function,
				});
			} else {
				$element = $('<span/>', {
					"id": "element-stage-" + element_id,
					"class": "element-stage " + element_class,
					text: element_type + " " + element_category + ", " + element_function + ", " + element_pattern,
				});
			}

			// Add parents and children to elements list
			// Add each parent only once to preserve hover event
			for (let j = 0; j < parents.length; j++) {
				if ($element.hasClass(parents[j][0]) && parents[j][4] === "not-child") {
					if ($("#element-stage-" + element_id).length === 0) {
						$("#element-list-stage").append($("<span/>", { "class": "element-wrapper-stage", "id": "element-wrapper-stage-" + i }));
						$("#element-wrapper-stage-" + i).append($delete_element);
						$("#element-wrapper-stage-" + i).append($element);
						$($delete_element).hover(function () { $(this).toggleClass("delete-highlight") });
						$($delete_element).click(deleteElement(element_id));
						$($element).hover(bracketWrapper(element_id));
						$($element).hover(revealLabel(element_id));
					}
				} else if ($element.hasClass(parents[j][1])) {
					if ($("#element-stage-" + element_id).length === 0) {
						$("<span/>", { "class": "element-wrapper-child", "id": "element-wrapper-stage-" + i }).appendTo($(".element-stage." + parents[j][0]).parent());
						$("#element-wrapper-stage-" + i).append($delete_element);
						$("#element-wrapper-stage-" + i).append($element);
						$($delete_element).hover(function () { $(this).toggleClass("delete-highlight") });
						$($delete_element).click(deleteElement(element_id));
						$($element).hover(bracketWrapper(element_id));
						$($element).hover(revealLabel(element_id));
					}
				}
			}
		}
	}

	// Make overlapping elements red to indicate problem
	$(".element-tree, .element-stage").each(function (){
		if(brackets_added.length > 1){
			for (let i=0; i < brackets_added.length; i++){
				if($(this).hasClass(brackets_added[i][2]) && brackets_added[i][4] === "mistake"){
					$(this).addClass("mistake");
					$(".parser-help").hide();
					$(".parser-error").show().text("* You have crossing bracket sets.");
				}
			}
		}
	});
}