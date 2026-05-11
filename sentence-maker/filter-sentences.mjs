// Sentence Markup for Bracket Notation
// (c)2026 Matthew Horton (GPL 2.0)

// Function to filter sentence objects
// This filtering tool includes more filtering options
// than available in the current app. Leaving intact in
// case of additional features later on.

import $ from './jquery-cdn.js';
import {indexed_sentences} from './get-sentence-objects.mjs';
import {renderList} from './render-list.mjs';

// Function to automate regex for pattern filter options
// Transforms xxx-yyy-zzz to xxx-yyy-[a-z]-zzz
export function makePatternClass(item){
	let test_string_pat1 = item.slice(0,8);
	let test_string_pat2 = item.slice(7);
	let regex = new RegExp(`\\b${test_string_pat1}[a-z]\+${test_string_pat2}\\b`);
	return regex;
}

export function filterSentences() {

	let filtered_sentences = [];

	// Get data from filter options, process, and assign to variables
	let fil_sen_mar_checked = $(".fil-sen-mar:checked").map(function() {return $(this).val();}).get();
	let fil_sen_typ_checked = $(".fil-sen-typ:checked").map(function() {return $(this).val();}).get();

	let fil_sen_pat_checked = $(".fil-sen-pat:checked").map(function() {
		return Number($(this).val());
	}).get();

	let fil_wor_nou_checked = $(".fil-wor-nou:checked").map(function() {return $(this).val();}).get();
	let fil_wor_pro_checked = $(".fil-wor-pro:checked").map(function() {return $(this).val();}).get();
	let fil_wor_ver_checked = $(".fil-wor-ver:checked").map(function() {return $(this).val();}).get();
	let fil_wor_adj_checked = $(".fil-wor-adj:checked").map(function() {return $(this).val();}).get();
	let fil_wor_adv_checked = $(".fil-wor-adv:checked").map(function() {return $(this).val();}).get();
	let fil_phr_pre_checked = $(".fil-phr-pre:checked").map(function() {return $(this).val();}).get();
	let fil_phr_par_checked = $(".fil-phr-par:checked").map(function() {return $(this).val();}).get();
	let fil_phr_ger_checked = $(".fil-phr-ger:checked").map(function() {return $(this).val();}).get();
	let fil_phr_inf_checked = $(".fil-phr-inf:checked").map(function() {return $(this).val();}).get();
	let fil_cla_nou_checked = $(".fil-cla-nou:checked").map(function() {return $(this).val();}).get();
	let fil_cla_adv_checked = $(".fil-cla-adv:checked").map(function() {return $(this).val();}).get();
	let fil_cla_adj_checked = $(".fil-cla-adj:checked").map(function() {return $(this).val();}).get();

	// General classes
	let fil_wor_checked = $(".fil-wor-fun:checked").map(function() {return $(this).val();}).get();
	let fil_phr_checked = $(".fil-phr-fun:checked").map(function() {return $(this).val();}).get();
	let fil_cla_checked = $(".fil-cla-fun:checked").map(function() {return $(this).val();}).get();
		
	// Each of these variables is an array of regex expressions for a filter condition
	let fil_phr_par_pat_checked = $(".fil-phr-par-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();
	
	let fil_phr_ger_pat_checked = $(".fil-phr-ger-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	let fil_phr_inf_pat_checked = $(".fil-phr-inf-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	let fil_cla_nou_pat_checked = $(".fil-cla-nou-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	let fil_cla_adv_pat_checked = $(".fil-cla-adv-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	let fil_cla_adj_pat_checked = $(".fil-cla-adj-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	// General classes
	let fil_phr_pat_checked = $(".fil-phr-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	let fil_cla_pat_checked = $(".fil-cla-pat:checked").map(function() {
		return makePatternClass($(this).val());
	}).get();

	// Sentence length
	let fil_sen_len_min = Number($('#sen-len-min').val());
	let fil_sen_len_max = Number($('#sen-len-max').val());

	// Build punctuation variables
	let fil_sen_pun_inp = [];
	let test_string_pun = $("#sen-pun-inp").val().replace(/[^.,!?$%;:—\-()“”’\'\"]/g, "");
	fil_sen_pun_inp = $("#sen-pun-inp").val().split(" ");
	fil_sen_pun_inp = fil_sen_pun_inp.filter(item => item !== "");	// remove empty array elements
	for(let i=0; i < fil_sen_pun_inp.length; i++){
		fil_sen_pun_inp[i] = fil_sen_pun_inp[i].replace(/[^.,!?$%;:—\-()“”’\'\"]/g, "");
	}
	// Build regex to simplify word array from sentence object: /[^${test_string_pun}]/g
	let punctRegex = new RegExp(`\[^${test_string_pun}\]`, "g");

	// Build word variable
	let fil_sen_wor_inp = $("#sen-wor-inp").val().split(" ");
	fil_sen_wor_inp = fil_sen_wor_inp.filter(item => item !== "");
	for(let i=0; i < fil_sen_wor_inp.length; i++){
		fil_sen_wor_inp[i] = fil_sen_wor_inp[i].toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=_—`~()“”\"]/g, "");
	}

 	// Build string variable
	let fil_sen_str_inp = $("#sen-str-inp").val().split(" ");
	fil_sen_str_inp = fil_sen_str_inp.filter(item => item !== "");
	for(let i=0; i < fil_sen_str_inp.length; i++){
		fil_sen_str_inp[i] = fil_sen_str_inp[i].toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=_—`~()“”\"]/g, "");
	}
 
	// Functions for conditions to use in filter method
	// Assigns anonymous functions (lambdas) to variables
	// Each lambda checks a condition to return boolean
	// Stored functions grouped in different filter arrays
	// Called (or not) based on filtering options 
	let filterBySentenceMarked = (obj) => {
		return fil_sen_mar_checked.length === 0 || (Object.keys(obj.classes).length > 0 || Object.keys(obj.nodes).length > 0);
	};

	let filterBySentenceType = (obj) => {
		return fil_sen_typ_checked.length === 0 || fil_sen_typ_checked.some(item => obj.type.includes(item));
	};

	let filterBySentencePattern = (obj) => {
		return fil_sen_pat_checked.length === 0 || fil_sen_pat_checked.some(item => obj.patterns.includes(item));
	};

	let filterBySentenceLength = (obj) => {
		let obj_sen_len = obj.words.length;
		if(fil_sen_len_min >= 0 && fil_sen_len_max >= fil_sen_len_min){
			$("#error-len").html("");
			return obj_sen_len >= fil_sen_len_min && obj_sen_len <= fil_sen_len_max;
		}else{
			$("#error-len").html("<span style='color: red;'>Max value should be bigger than min.</br></span>");
		}
	};

	let filterBySentencePunctuation = (obj) => {
		let obj_sen_pun = [...obj.words];

		// Clean each element of word array of character but punctuation input
		// Remove empty elements from word array
		for(let i=0; i < obj_sen_pun.length; i++){
			obj_sen_pun[i] = obj_sen_pun[i].replace(punctRegex, "");
		}
		obj_sen_pun = obj_sen_pun.filter(item => item !== "");
		if ($("#sen-pun-all").prop("checked")){
			return fil_sen_pun_inp.length === 0 || fil_sen_pun_inp.every(item => obj_sen_pun.includes(item));
		}else{
			return fil_sen_pun_inp.length === 0 || fil_sen_pun_inp.some(item => obj_sen_pun.includes(item));
		}
	};

	let filterBySentenceWords = (obj) => {
		let obj_sen_wor = [...obj.words];

		// Clean object array of non-word characters
 		for(let i=0; i < obj_sen_wor.length; i++){
			obj_sen_wor[i] = obj_sen_wor[i].toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=_—`~()“”\"]+/g, "");
		}
 		
		// Replace regular apostrophe with special character to match sentence object
		// Run through each word of sentence object to check for special apostrophe
		// If it exists, replace regular apostrophe with special one in input
		for(let i=0; i < fil_sen_wor_inp.length; i++){
			for(let j=0; j < obj_sen_wor.length; j++){
				if(obj_sen_wor[j].includes("’")){
					fil_sen_wor_inp[i] = fil_sen_wor_inp[i].replace(/[\']/g, "’");
				}
			}
		}
		
		if ($("#sen-wor-all").prop("checked")){
			return fil_sen_wor_inp.length === 0 || fil_sen_wor_inp.every(item => obj_sen_wor.includes(item));
		}else{
			return fil_sen_wor_inp.length === 0 || fil_sen_wor_inp.some(item => obj_sen_wor.includes(item));
		}
	};

		let filterBySentenceStrings = (obj) => {
		let obj_sen_wor = [...obj.words].join(" ");

		// Clean object array of non-word characters
		obj_sen_wor = obj_sen_wor.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=_—`~()“”\"]+/g, "");

		// Replace regular apostrophe with special character to match sentence object
		// Run through each word of sentence object to check for special apostrophe
		// If it exists, replace regular apostrophe with special one in input
		for(let i=0; i < fil_sen_str_inp.length; i++){
				if(obj_sen_wor.includes("’")){
					fil_sen_str_inp[i] = fil_sen_str_inp[i].replace(/[\']/g, "’");
				}
		}

		if ($("#sen-str-all").prop("checked")){
			return fil_sen_str_inp.length === 0 || fil_sen_str_inp.every(item => obj_sen_wor.includes(item));
		}else{
			return fil_sen_str_inp.length === 0 || fil_sen_str_inp.some(item => obj_sen_wor.includes(item));
		}
	};

	// Function to get each sentence object class
	function getClasses(item){
		let obj_sen_cls = Object.keys(item.classes).join(" ");
		return obj_sen_cls;
	}
	
	let filterByNouns = (obj) => {
		return fil_wor_nou_checked.length === 0 || fil_wor_nou_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByPronouns = (obj) => {
		return fil_wor_pro_checked.length === 0 || fil_wor_pro_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByVerbs = (obj) => {
		return fil_wor_ver_checked.length === 0 || fil_wor_ver_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByAdjectives = (obj) => {
		return fil_wor_adj_checked.length === 0 || fil_wor_adj_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByAdverbs = (obj) => {
		return fil_wor_adv_checked.length === 0 || fil_wor_adv_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByPrepositionals = (obj) => {
		return fil_phr_pre_checked.length === 0 || fil_phr_pre_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByParticiples = (obj) => {
		return fil_phr_par_checked.length === 0 || fil_phr_par_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByGerunds = (obj) => {
		return fil_phr_ger_checked.length === 0 || fil_phr_ger_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByInfinitives = (obj) => {
		return fil_phr_inf_checked.length === 0 || fil_phr_inf_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByParPatterns = (obj) => {
		return fil_phr_par_pat_checked.length === 0 || fil_phr_par_pat_checked.some(item => item.test(getClasses(obj)));
	};

	let	filterByGerPatterns = (obj) => {
		return fil_phr_ger_pat_checked.length === 0 || fil_phr_ger_pat_checked.some(item => item.test(getClasses(obj)));
	};

	let	filterByInfPatterns = (obj) => {
		return fil_phr_inf_pat_checked.length === 0 || fil_phr_inf_pat_checked.some(item => item.test(getClasses(obj)));
	};

	let	filterByNounClauses = (obj) => {
		return fil_cla_nou_checked.length === 0 || fil_cla_nou_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByAdverbClauses = (obj) => {
		return fil_cla_adv_checked.length === 0 || fil_cla_adv_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByAdjectiveClauses = (obj) => {
		return fil_cla_adj_checked.length === 0 || fil_cla_adj_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByNCPatterns = (obj) => {
		return fil_cla_nou_pat_checked.length === 0 || fil_cla_nou_pat_checked.some(item => item.test(getClasses(obj)));
	};

	let	filterByADVPatterns = (obj) => {
		return fil_cla_adv_pat_checked.length === 0 || fil_cla_adv_pat_checked.some(item => item.test(getClasses(obj)));
	};

	let	filterByAJCPatterns = (obj) => {
		return fil_cla_adj_pat_checked.length === 0 || fil_cla_adj_pat_checked.some(item => item.test(getClasses(obj)));
	};

	// More inclusive filters
	let	filterByWords = (obj) => {
		return fil_wor_checked.length === 0 || fil_wor_checked.some(item => getClasses(obj).includes(item));
	};

	let	filterByPhrases = (obj) => {
		if($(".fil-phr-pat").prop("checked")){
			return fil_phr_pat_checked.length === 0 || fil_phr_pat_checked.some(item => item.test(getClasses(obj)));
		}else {
			return fil_phr_checked.length === 0 || fil_phr_checked.some(item => getClasses(obj).includes(item));
		}
	};

	let	filterByClauses = (obj) => {
		if($(".fil-cla-pat").prop("checked")){
			return fil_cla_pat_checked.length === 0 || fil_cla_pat_checked.some(item => item.test(getClasses(obj)));
		}else {
			return fil_cla_checked.length === 0 || fil_cla_checked.some(item => getClasses(obj).includes(item));
		}
	};
	
	// Build dynamic search elements (variables and functions)
	let sentence_filter_functions = [
		filterBySentenceMarked,
		filterBySentenceType,
		filterBySentencePattern,
		filterBySentenceLength,
		filterBySentencePunctuation,
		filterBySentenceWords,
		filterBySentenceStrings,
		filterByWords,
		filterByPhrases,
		filterByClauses
	];
	let allWordFilters = [
		filterByNouns,
		filterByPronouns,
		filterByVerbs,
		filterByAdjectives,
		filterByAdverbs,
	];
	let wordFiltersToDelete = [filterByWords];
	let allPhraseFilters = [
		filterByPrepositionals,
		filterByParticiples,
		filterByGerunds,
		filterByInfinitives,
		filterByParPatterns,
		filterByGerPatterns,
		filterByInfPatterns
	];
	let phraseFiltersToDelete = [filterByPhrases];
	let allClauseFilters = [
		filterByNounClauses,
		filterByAdverbClauses,
		filterByAdjectiveClauses,
		filterByNCPatterns,
		filterByADVPatterns,
		filterByAJCPatterns
	];
	let clauseFiltersToDelete = [filterByClauses];


	// Start with filters that are inherently exclusive
	let sentence_filters = [];
	
	for(let i=0; i < sentence_filter_functions.length; i++){
		sentence_filters.push(sentence_filter_functions[i]);	
	}

	// Modify filters based on user selection of "all" vs. "any"
	if ($("#wor-all").prop("checked")){
		sentence_filters = sentence_filters.filter(item => !wordFiltersToDelete.includes(item));
		sentence_filters.push(...allWordFilters);
	}
	
	if ($("#phr-all").prop("checked")){
		sentence_filters = sentence_filters.filter(item => !phraseFiltersToDelete.includes(item));
		sentence_filters.push(...allPhraseFilters);
	}
	
	if ($("#cla-all").prop("checked")){
		sentence_filters = sentence_filters.filter(item => !clauseFiltersToDelete.includes(item));
		sentence_filters.push(...allClauseFilters);
	}

	// Each sentence_object in indexced_sentences passed
	// to every stored lambda in sentence_filters array
	filtered_sentences = indexed_sentences
		.filter(obj => sentence_filters.every(filterFn => filterFn(obj)));

	// Update list of sentences to review and select
	renderList(filtered_sentences);
}