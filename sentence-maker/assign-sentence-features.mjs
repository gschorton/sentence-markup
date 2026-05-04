// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to open and position modal
// containing sentence feature selectors

import $ from './jquery-cdn.js';
import { sentence_object } from './main.js';
import { restoreSentenceMarkup } from './restore-sentence-markup.mjs';

export function assignSentenceFeatures (x,y) {

    $('#sent-type-pattern').modal();	
    $(".jquery-modal.blocker.current").addClass("sent-type-pattern");
    $('#sent-type-pattern').css({
        'position': 'absolute',
        'top': y+30 + 'px',
        'left': x-100 + 'px',
    });
}