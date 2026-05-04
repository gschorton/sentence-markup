// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to create and add spans for open and close brackets
// Open brackets added to first instance of most frequent classes first
// Then by lowest word index (0 before 1)
// Then by general to specific class (NP befort N)
// Add label for each open bracket
// Close brackets added to last instance of class in opposite order
// Add arrow notation, if present, to each close bracket
// Also tests for crossed bracket sets in case of parser error

import $ from './jquery-cdn.js';
import {bracketWrapper,sentence_object} from './main.js';

export let brackets_added = [];

export function addBrackets(){

	// Empty brackets_added array
	brackets_added.length = 0;

	// Remove all bracket elements from DOM
	$(".bracket").remove();

	// Create bracket sets for each class stored in sentence_object
	// First check if there are any stored classes
	if(Object.keys(sentence_object.c).length > 0){
		
		// Loop through the classes to create brackets for each
		// Creates open and close brackets and appends to DOM
		// before and after first and last word, respectively
		for (let i=0; i<Object.keys(sentence_object.c).length; i++){

			let word_class = Object.keys(sentence_object.c)[i];
			let indices = Object.values(sentence_object.c)[i];
			let bracket_end_label = sentence_object.be[i];

			// Adds word class and creates head label based on it
			// Taking substring of class because class has other
			// information to help with sorting in earlier step
			let $open_bracket = $('<span/>', {
				"class": "bracket bracket-start-" + i + " " + word_class,
				text: "[" + word_class.split("-")[0].substring(1) + " "
			});

			// Added ability to add arrow code to end bracket
			// ->, <-, or <>, followed by column number
			// If present in sentence object, added to end bracket
			if(bracket_end_label === undefined){
				bracket_end_label = "";
			}else{
				bracket_end_label = " "+bracket_end_label;
			}
			let $close_bracket = $('<span/>', {
				"class": "bracket bracket-end-" + i + " " + word_class,
				text: bracket_end_label+"]"
			});

			// Place open and close brackets before and after words
			// Will drop punctuation before sending to tree maker
			// Allows for special characters in labels
			$(".sent-word." + $.escapeSelector(word_class)).first().before($open_bracket);
			$(".sent-word." + $.escapeSelector(word_class)).last().after($close_bracket);

			// Bind each bracket to function for highlighting
			$(".bracket-start-" + i).hover(bracketWrapper(i));
			$(".bracket-end-" + i).hover(bracketWrapper(i));
			// Add bracket information to array for additional checks
			brackets_added[i] = ["bracket-start-"+i,"bracket-end-"+i,word_class,indices];
			$("#show-hide-brackets").show().text("Hide brackets");
		}

		// Find overlapping brackets to point out mistakes
		if(brackets_added.length >1){
			for (let i=0; i<brackets_added.length-1; i++){
				for (let j=i+1; j<brackets_added.length; j++){
					let a_seq = brackets_added[i][3];
					let b_seq = brackets_added[j][3];

					// Series of tests to make sure that any set of brackets
					// is entirely inside or entirely outside any other set
					if(a_seq.length > 1 && b_seq.length > 1 && a_seq.length === b_seq.length){
						if(a_seq.some(item => b_seq.includes(item)) && !a_seq.every(item => b_seq.includes(item))){
							brackets_added[i].push("mistake");
							brackets_added[j].push("mistake");
						}
					}else if(a_seq.length > 1 && b_seq.length > 1 && a_seq.length > b_seq.length){
						if(b_seq.some(item => a_seq.includes(item)) && !b_seq.every(item => a_seq.includes(item))){
							brackets_added[i].push("mistake");
							brackets_added[j].push("mistake");
						}						
					}else if(a_seq.length > 1 && b_seq.length > 1 && a_seq.length < b_seq.length){
						if(a_seq.some(item => b_seq.includes(item)) && !a_seq.every(item => b_seq.includes(item))){
							brackets_added[i].push("mistake");
							brackets_added[j].push("mistake");
						}						
					}
				}
			}
		}			

		// Add shared classes for nested bracket set highlighting
		if(brackets_added.length >1){
			let excluded_classes = ["sent-word", "selectable"];
			for (let i=0; i<brackets_added.length-1; i++){
				for (let j=i+1; j<brackets_added.length; j++){
					if(brackets_added[j][3].every(item => brackets_added[i][3].includes(item))){
						$("."+brackets_added[j][0]+", ."+brackets_added[j][1]).addClass(brackets_added[i][2]);
					}else if(brackets_added[i][3].every(item => brackets_added[j][3].includes(item))){
						$("."+brackets_added[i][0]+", ."+brackets_added[i][1]).addClass(brackets_added[i][2]);
					}
				}
			}
		}
	}
}