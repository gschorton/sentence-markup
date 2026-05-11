// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to set up filter operations

import { renderList } from "./render-list.mjs";
import { filterSentences } from "./filter-sentences.mjs";
import { setFilters } from "./set-filters.mjs";

export function filterOperations() {

	// Binding to prevent refresh when clicking away from input
	$(document).on('change blur', '#sen-str-inp', function (e) {
		e.preventDefault();
	});

	$(document).on('change blur', '#sen-wor-inp', function (e) {
		e.preventDefault();
	});

	$(document).on('change blur', '#sen-pun-inp', function (e) {
		e.preventDefault();
	});

	// Bind filter buttons to respective actions
	$(document).on('click', '.filter-option-reset', function () {
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
		renderList(indexed_sentences);
	});

	$(document).on('click', '.filter-update', function (e) {
		e.preventDefault();
		filterSentences();
		$("#filter-option-submit-feedback").text("Filters updated!").removeClass();
	});

	$(document).on('click', '#filter-option-all', function (e) {
		e.preventDefault();
		$(".filter-option").each(function () {
			let element_id = $(this).attr("id");
			$("label[for=" + element_id + "]").removeClass("hide-this").show();
			$(this).removeClass("hide-this").show();
		});
	});

	$(document).on('click', '#filter-option-available', function (e) {
		e.preventDefault();
		$(".filter-option").each(function () {
			let element_id = $(this).attr("id");
			$("label[for=" + element_id + "]").addClass("hide-this").hide();
			$(this).addClass("hide-this").hide();
		});
		setFilters();
	});

	$(document).on('change', '.filter-option', function () {
		$("#filter-option-submit-feedback").text("New filters waiting . . .").addClass("needs-update");
	});

	// Controls for filter options menu
	$(document).on('click', '.menu-toggle', function (e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).next("span").toggleClass("visible");

		// Toggle the current menu
		$(this).next('.submenu').slideToggle();
		$(this).parent().next('.submenu').slideToggle();
		$(this).next('.submenu1').slideToggle();
	});

	// Default menu arrangement
	// Make sure happens after DOM load
	setTimeout(() => {
		$('.submenu').slideToggle();
		$('.menu-toggle-top').toggleClass("active");
		$('.fil-sen-wor-opt, .fil-sen-str-opt, .fil-sen-pun-opt').toggleClass("visible");

	}, 100);

	// Add general category class to each specific class
	// To increase filtering flexibility
	$(".fil-wor-nou, .fil-wor-pro, .fil-wor-ver, .fil-wor-adj, .fil-wor-adv").addClass("fil-wor-fun");
	$(".fil-phr-pre, .fil-phr-par, .fil-phr-ger, .fil-phr-inf").addClass("fil-phr-fun");
	$(".fil-cla-nou, .fil-cla-adv, .fil-cla-adj").addClass("fil-cla-fun");
	$(".fil-phr-par-pat, .fil-phr-ger-pat, .fil-phr-inf-pat").addClass("fil-phr-pat");
	$(".fil-cla-nou-pat, .fil-cla-adv-pat, .fil-cla-adj-pat").addClass("fil-cla-pat");

}