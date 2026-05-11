// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to call various functions whenever adding or removing markup
// Order of these functions is set to update DOM and sentence_object

import $ from './jquery-cdn.js';
import { assignClasses } from './assign-classes.mjs';
import { sortClasses } from './sort-classes.mjs';
import { addClasses } from './add-classes.mjs';
import { loadSentence } from './load-sentence.mjs';
import { addBrackets } from './add-brackets.mjs';
import { updateElements } from './update-elements.mjs';
import { sendSentence } from './send-sentence.mjs';
import { createLabels } from './create-labels.mjs';
import { shiftLabelPosition } from './shift-label-position.mjs';


export function restoreSentenceMarkup(){
	assignClasses();		// Add new specific classes to arrays for sorting
	sortClasses();			// Function to sort classes by frequency to control proper nesting
	addClasses();			// Function to add classes to sentence object
	loadSentence();			// Load sentence into DOM
	createLabels();			// Only for Sentence Stager
	addBrackets();			// Function to create brackets to surround words, phrases, clauses
	updateElements();		// Function to create or update list of elements for removal
	sendSentence();			// Function to send coded sentence to tree maker or sentence stager
	shiftLabelPosition();	// Wait until sentence is "on stage"
};