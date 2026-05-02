// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to call various functions whenever adding or removing markup
// Order of these functions is set to update DOM and sentence_object

import $ from './jquery-cdn.js';
import { assignWordClasses } from './assign-word-classes.mjs';
import { sortWordClasses } from './sort-word-classes.mjs';
import { addClasses } from './add-classes.mjs';
import { loadSentence } from './load-sentence.mjs';
import { addBrackets } from './add-brackets.mjs';
import { updateElements } from './update-elements.mjs';
import { sendSentence } from './send-sentence.mjs';


export function restoreSentenceMarkup(){
	assignWordClasses();	// Add new specific classes to arrays for sorting
	sortWordClasses();		// Function to sort word classes by frequency to control proper nesting
	addClasses();			// Function to add classes to sentence object
	loadSentence();			// Load sentence into DOM
	addBrackets();			// Function to create brackets to surround phrases and clauses
	updateElements();		// Function to create or update list of elements
	sendSentence();			// Function to send coded sentence to tree maker
};