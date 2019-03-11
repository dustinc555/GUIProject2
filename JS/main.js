
var note_bar = document.getElementById("note_bar");

for (var key in Note.pitchList) {
	if (Note.pitchList.hasOwnProperty(key)) {
		var newButton = document.createElement("BUTTON");
		var textNode = document.createTextNode(key);

		newButton.pitch = key;
		newButton.appendChild(textNode);
		newButton.className = "note_button";

		newButton.onclick = function() {
			playNote(new Note(this.pitch, 1));
		};
 
		note_bar.appendChild(newButton);
	}
}
