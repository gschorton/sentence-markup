// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to get available json files to load

import $ from './jquery-cdn.js';
import { getSentenceObjects } from './get-sentence-objects.mjs';

export function getJsonFilelist() {
	$('#find-sentence').modal();

	// Ensures most recent version instead of cached version
	$.getJSON("sentence-maker/sentence-files/filelist.json?t=" + Date.now(), function (data) {
		console.log("Loading filelist from external JSON ...");
		let file_list = data.files;

		// Check for data before populating dropdown options
		if (file_list.length > 0) {
			let dropdown = $('#file-options'); // Target your select element
			dropdown.empty(); // Clear existing options
			dropdown.append('<option selected="true" disabled>Choose a File</option>'); // Add default prompt
			
			// Append each pathway as an option
			$.each(file_list, function (key, entry) {
				dropdown.append($('<option></option>')
					.attr('value', entry.path)
					.text(entry.name));
			});
		}
	})
	.done(function () {
		console.log("Complete.");
	})
	.fail(function () {
		console.log("Filelist did not load.");
	})
	.always(function () {
		//		console.log( "Complete. Did it work?" );
	});

	$(document).off('change','#file-options').on('change','#file-options', function() {
		let selected_file = $(this).val();
		getSentenceObjects(selected_file);
	});
}