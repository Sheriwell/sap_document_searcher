//
// Libraries
//
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function returnSearchCondition(query_id, radio_elements_name) {
	var query = document.getElementById(query_id).value;
	var radio_elements = document.getElementsByName(radio_elements_name);
	var len = radio_elements.length;
	for (var i = 0; i < len; i++){
		if (radio_elements.item(i).checked){
			selected_variant = i;
		}
	}
	return [selected_variant, query];
}

function searchHelp() {
	var arr_searchcond = returnSearchCondition('query1', 'slct_help');
	chrome.storage.sync.set({"storage_slct_help": arr_searchcond[0], "storage_query": arr_searchcond[1]});
	var url_base = 'https://help.sap.com/docs/';
	var url = url_base + arr_slct_help[arr_searchcond[0]] + '?q=' + arr_searchcond[1];
	window.open(url, '_blank');
}

function searchBlog() {
	var arr_searchcond = returnSearchCondition('query1', 'slct_blog');
	chrome.storage.sync.set({"storage_slct_blog": arr_searchcond[0], "storage_query": arr_searchcond[1]});
	if (arr_searchcond[0] == 0) {
		var url_base = 'https://community.sap.com/search/';
		var url = url_base + '?ct=' + arr_slct_blog[arr_searchcond[0]] + '&q=' + arr_searchcond[1];
	} else {
		var url_base = 'https://www.google.com/search';
		var url = url_base + '?q=' + arr_searchcond[1] + ' site%3Ablogs.sap.com';
	}
	window.open(url, '_blank');
}

function searchNote() {
	var query = document.getElementById('query1').value;
	chrome.storage.sync.set({"storage_query": query});
	if (isNaN(query) === true) {
		var url_base = 'https://launchpad.support.sap.com/#/solutions/notesv2/';
		var url = url_base + '?q=' + query;
	} else {	
		var url_base = 'https://launchpad.support.sap.com/#/notes/';
		var url = url_base + parseInt(query);
	}
	window.open(url, '_blank');
}

function searchTutorial() {
	var query = document.getElementById('query1').value;
	chrome.storage.sync.set({"storage_query": query});
	var url_base = 'https://developers.sap.com/tutorial-navigator.html';
	var url = url_base + '?search=' + query;
	window.open(url, '_blank');
}

function searchFiori() {
	var query = document.getElementById('fiori_id').value;
	chrome.storage.sync.set({"storage_fiori_id": query});
	var url_base = 'https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#';
	var url = url_base + '?appId=' + query;
	window.open(url, '_blank');
}

function clearTexts() {
	document.getElementById('query1').value = '';
	document.getElementById('fiori_id').value = '';
	chrome.storage.sync.set({"storage_query": '', "storage_fiori_id": ''});

}


//
// Main
//
var arr_slct_help = {
	0: "SAP_S4HANA_ON-PREMISE",
	1: "SAP_S4HANA_CLOUD",
	2: "BTP",
	3: "SAP_ANALYTICS_CLOUD",
	4: "SAP_DATA_WAREHOUSE_CLOUD",
	
};

var arr_slct_blog = {
	0: "blog",
	1: "blog_g"	
};


const imageArea = document.getElementById('decoration_area');
const imageNo = getRandomInt(14);
const paddedNo = ( '000' + imageNo ).slice( -3 );
imageArea.src = 'images/decoration/' + paddedNo + '.svg';
 
chrome.storage.sync.get(["storage_slct_help", "storage_slct_blog", "storage_query", "storage_fiori_id"], function(items) {
	try {document.getElementsByName('slct_help')[items.storage_slct_help].checked = true;} catch {}
	try {document.getElementsByName('slct_blog')[items.storage_slct_blog].checked = true;} catch {}
	try {
		if (items.storage_query != undefined) {
			document.getElementById('query1').value = items.storage_query;
		}
	} catch {}
	try {
		if (items.storage_fiori_id != undefined) {
			document.getElementById('fiori_id').value = items.storage_fiori_id;
		}
	} catch {}

});

document.getElementById("searchHelp").onclick = function() {
	document.form1.submit();
	searchHelp();
};

document.getElementById("searchBlog").onclick = function() {
	document.form1.submit();
	searchBlog();
};

document.getElementById("searchNote").onclick = function() {
	document.form1.submit();
	searchNote();
};

document.getElementById("searchTutorial").onclick = function() {
	document.form1.submit();
	searchTutorial();
};

document.getElementById("searchFiori").onclick = function() {
	document.form2.submit();
	searchFiori();
};

document.getElementById("clear_texts").onclick = function() {
	clearTexts();
};


