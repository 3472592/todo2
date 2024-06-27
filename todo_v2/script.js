window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var clearButton = document.getElementById("clear_button");
	clearButton.onclick = clearStickyNotes;

    var stickiesArray = localStorage["stickiesArray"]; //grabbing array from loc store
    if (!stickiesArray) { // check if there is sti array
        stickiesArray = []; // if not create empty array
        localStorage.setItem(stickiesArray, JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    for (var i = 0; i < stickiesArray.length; i++) { // iterate through array
		var key = stickiesArray[i];
        // each el in array is the key of sticky use that to retrieve item from loc store
		var value = localStorage[key]; 
		addStickyToDOM(key, value);
	}	
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray"); // get item sA from ls.
    if (!stickiesArray) { // check for array
        stickiesArray = []; // if no array create new one in ls
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); // stringify json
	} else {
		stickiesArray = JSON.parse(stickiesArray); // if exists then parse json
	}
	return stickiesArray;
}

function createSticky() {
	var stickiesArray = getStickiesArray();
	var currentDate = new Date(); // take current date
	var key = "sticky_" + currentDate.getTime(); //make new key id by using curr date in ms's
	var value = document.getElementById("note_text").value;

	localStorage.setItem(key, value);
	stickiesArray.push(key); // add new key to stickers array
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	
	addStickyToDOM(key, value);
}

function addStickyToDOM(key, value) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
    //adding unique id to li el
	sticky.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class", "sticky");
	span.innerHTML = value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);

	sticky.onclick = deleteSticky;
}


function deleteSticky(e) {
	var key = e.target.id; // target is el being clicked on that generated event, getting id name from target propperty
	if (e.target.tagName.toLowerCase() == "span") { // if target is our span get the parent el
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i = 0; i < stickiesArray.length; i++) {
			if (key == stickiesArray[i]) {
				stickiesArray.slice(i ,1);
			}
		}
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		removeStickyFromDOM(key);
	}
}

function removeStickyFromDOM(key) {
	var sticky = document.getElementById(key);
	sticky.parentNode.removeChild(sticky); // remove child of ul which is li
}


function clearStickyNotes() {
	localStorage.clear();
	var stickyList = document.getElementById("stickies");
	var stickies = stickyList.childNodes;
	for (var i = stickies.length-1; i >= 0; i--) {
		stickyList.removeChild(stickies[i]);
	}

	// reset notes array
	var stickiesArray = getStickiesArray();
}