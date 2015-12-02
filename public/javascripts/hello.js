const es6Hello = "Hello OpenSD";

console.log(es6Hello);

var repoElements = Array.from(document.querySelectorAll("div.repository-selection button"));
repoElements.forEach(function(el, i) {
  el.addEventListener("click", function() {
    el.classList.toggle("active");
  });
});

var searchListeners = Array.from(document.querySelectorAll("div.main-search"));
searchListeners.forEach(function(el, i){
  el.addEventListener("click", function(){
  //add button
    if(event.target.classList.contains('add-search-button')){
      var searchBarNodeClone = document.querySelectorAll('div.reusable-search')[0].cloneNode(true);
      searchBarNodeClone.childNodes[0].childNodes[0].innerHTML = "Select " + "<span class=\"caret\"></span>";
      searchBarNodeClone.childNodes[1].value="";
      searchBarNodeClone.childNodes[1].placeholder="";
      event.target.parentNode.parentNode.parentNode.insertBefore(searchBarNodeClone,event.target.parentNode.parentNode.nextSibling);
    }
  //add button icon
    else if(event.target.parentNode.classList.contains('add-search-button')){
      var searchBarNodeClone = document.querySelectorAll('div.reusable-search')[0].cloneNode(true);
      searchBarNodeClone.childNodes[0].childNodes[0].innerHTML = "Select " + "<span class=\"caret\"></span>";
      searchBarNodeClone.childNodes[1].value="";
      searchBarNodeClone.childNodes[1].placeholder="";
      event.target.parentNode.parentNode.parentNode.parentNode.insertBefore(searchBarNodeClone,event.target.parentNode.parentNode.parentNode.nextSibling);
    }
  //dropdown
    else if(event.target.nodeName === 'A'){
      if(!event.target.parentNode.classList.contains('disabled')){
    	var keywordButton = event.target.parentNode.parentNode.parentNode.firstChild;
	keywordButton.childNodes[0].nodeValue = event.target.innerHTML;
	var buttonText = keywordButton.innerText.trim();
	var searchFieldArray = Array.from(keywordButton.parentNode.parentNode.childNodes);
	searchFieldArray.forEach(function(el, i){
	  if(el.nodeName == "INPUT"){
	    el.name = buttonText;
	    switch(buttonText){
	      case "Author":
	        el.placeholder="i.e. Jon Smith";
	        el.type="text";
	        break;
	      case "Keywords":
	        el.placeholder="i.e. Biology, Health"
	        el.type="text"
	        break;
	      case "Email":
	        el.type="email";
	        el.placeholder="i.e. jon_smith@gmail.com";
	        break;
	      case "Date":
	        el.type="date";
	        el.placeholder="MM/DD/YYYY";
	        break;
	      case "ORCID":
	        el.type="text";
	        el.pattern="[0-9X]{16}"
	        el.placeholder="i.e. 00001111222233334444";                
	        break;
	      case "Code Repository":
	        el.type="url";
	        el.placeholder="i.e. http://github.com/myRepo";
	        break;
	      default:
	        el.type="text";
	        el.placeholder="";
	    }
	  }
	});
	disabledKeywordHelper();
      }
    }
  });
});
function disabledKeywordHelper(){
  var keywordButtons = Array.from(document.querySelectorAll('button.keyword-dropdown'));
  var disabledArray=[];
  keywordButtons.forEach(function(el, i){
    disabledArray.push(el.textContent);
  });
  var listElements = Array.from(document.querySelectorAll('ul.dropdown-menu li a'));
  listElements.forEach(function(listEl, j){
    if(disabledArray.indexOf(listEl.textContent) !== -1){
      if(!listEl.parentElement.classList.contains('disabled')){
        listEl.parentElement.classList.toggle('disabled');
        listEl.parentElement.classList.toggle('list-group-item');
      }
    }
    else if(disabledArray.indexOf(listEl.textContent) === -1 && listEl.parentElement.classList.contains('disabled')){
      listEl.parentElement.classList.toggle('disabled');
      listEl.parentElement.classList.toggle('list-group-item');
    }
  });
}
function processForm(e) {
  //if (e.preventDefault) e.preventDefault();
    console.log(e);   
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
function isEmpty(urlParams) {
  for(var key in urlParams) {
    if(urlParams.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
if(isEmpty(urlParams)){
  //display results
}
var form = document.getElementById('search-form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
