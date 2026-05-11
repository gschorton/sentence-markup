// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)
 
// Function to shift label to correct position above the first word of element

import $ from './jquery-cdn.js';
import {sentence_object, user_interface} from './main.js';


export function shiftLabelPosition (){
	if ($(".labels").length > 0 && user_interface === "stage-sentences"){
		$(".labels").each(function (index){
			let class_list = $("#label-"+index).attr("class").split(" ");
			let unique_class = class_list[1];
			let word_class = Object.keys(sentence_object.classes)[index];
			let indices = Object.values(sentence_object.classes)[index];
			let not_consec = null;

			// Default slot to label
			let bracket_to_label = $(".sent-word."+unique_class).first();				

			// Account for elements with words that are not continguous
			// Based on non-consecutive array values
			// Changes slot to label
			if(indices.length > 1){
				for(let i=1;i<indices.length;i++){
					if(indices[i-1] + 1 < indices[i]){
						not_consec = i;				
					}
					if(not_consec != null && word_class.substring(0,3) != "wor"){
						bracket_to_label = $(".sent-word."+unique_class).eq(not_consec);				
					}
				}				
			}
			
			// Use position() to modify css of labels
			let position = bracket_to_label.position();
			$(".labels."+unique_class).css({top: position.top-15+"px", left: position.left+"px", position:"absolute"});
		});
	}
}