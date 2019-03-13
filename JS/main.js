// Initialize
 
// get HTML elements
// get HTML elements
/*
index_elements = {
    "note_bar" : document.getElementById("note_bar"),
    "confirm_button" : document.getElementById("confirm_button"),
    "lengthSlider" : document.getElementById("note_length_slider"),
    "lengthLabel" : document.getElementById("length_label"),
    "note_production_label" : document.getElementById("note_production_label"),
    "song_area" : document.getElementById("song_area")
}*/

var note_bar = document.getElementById("note_bar");
var confirm_button = document.getElementById("confirm_button");
var lengthSlider = document.getElementById("note_length_slider");
var lengthLabel = document.getElementById("length_label");
var note_production_label = document.getElementById("note_production_label");
var song_area = document.getElementById("song_area");
var undo_button  = document.getElementById("undo_button");
var redo_button = document.getElementById("redo_button");


// array that contains the current song
var songList = [];

// used by confirm note, undo, redo buttons.
var commandStack = new CommandStack();

// populate notes
for (var key in Note.pitchList) {
    if (Note.pitchList.hasOwnProperty(key)) {
        var newButton = document.createElement("BUTTON");
        var textNode = document.createTextNode(key);

        newButton.pitch = key;
        newButton.appendChild(textNode);
        newButton.className = "note_button";

        newButton.onclick = function() {
            note_button_callback(this.pitch);
        };
 
        note_bar.appendChild(newButton);
    }
}

// initialize main page slider
lengthSlider.oninput = function() {
  length_slider_callback(this.value);
}

// initialize production note button 
setProductionNote(new Note('A4', 0.2));
length_slider_callback(lengthSlider.value);

// set confirm button callback
confirm_button.onclick = function() {
    confirm_button_callback(note_production_label.note);
}


undo_button.onclick = function() {
    undo_button_callback();
}

redo_button.onclick = function() {
    redo_button_callback();
}



// index.html utility functions
/*** populates the song_area element with songList contents ****/
function populateSongArea() {
    song_area.innerHTML = "";
    songList.forEach(note => {
        song_area.innerHTML += note.pitch + " " + note.length + " ";
  });
}


/**** Production Note Label interface *****************************************/
function updateProductionNote() {
    note = note_production_label.note;
    note_production_label.innerHTML = note.pitch + ' ' + note.length;
}

function setProductionNote(note) {
    note_production_label.note = note;
    updateProductionNote();
}

function setProductionNotePitch(pitch) {
    note_production_label.note.pitch = pitch;
    updateProductionNote();
}

function setProductionNoteLength(length) {
    note_production_label.note.length = length;
    updateProductionNote();
}


function setSongList(newList) {
    songList = newList;
    populateSongArea();
}

// callbacks

/**** Note Button callback  ***************************************************/
function note_button_callback(pitch) {
    note_production_label.note = note;
    setProductionNotePitch(pitch);
}

/**** length set button callback  ***************************************************/
function length_slider_callback(value) {
    setProductionNoteLength(value);
}

/*** populates the song_area elem ****/
// sends off to CommandStack
function confirm_button_callback(note) {
    commandStack.execute(new NoteCommand(new Note(note.pitch, note.length), songList));
    populateSongArea();
}

/*** undo ****/
function undo_button_callback() {
    commandStack.undo();
    populateSongArea();
}

/*** redo ****/
function redo_button_callback() {
    commandStack.redo();
    populateSongArea();
}