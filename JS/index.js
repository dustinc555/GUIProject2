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
var play_song_button = document.getElementById("play_song_button");
var play_note_button = document.getElementById("play_note_button");
var set_length_button = document.getElementById("set_length_button");
var clear_button = document.getElementById("clear_button");
var save_button = document.getElementById("save_button");
var song_title_box = document.getElementById("song_title_box");

// intialize song to be empty
var songList = checkUserStorage();

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

drawSongArea();

// initialize main page slider
lengthSlider.oninput = function() {
  length_slider_callback(this.value);
}

// initialize production note button 
setProductionNote(new Note('A4', 0.2));
length_slider_callback(lengthSlider.value);

// SET CALLBACKS
save_button.onclick = function() {
    save_button_callback();
}

confirm_button.onclick = function() {
    confirm_button_callback(note_production_label.note);
}

undo_button.onclick = function() {
    undo_button_callback();
}

redo_button.onclick = function() {
    redo_button_callback();
}

play_song_button.onclick = function() {
    playSong(songList);
}

play_note_button.onclick = function() {
    playNote(note_production_label.note);
}

set_length_button.onclick = function() {
    set_length_button_callback();
}

clear_button.onclick = function() {
    clear_button_callback();
}

// index.html utility functions
/*** populates the song_area element with songList contents ****/
function drawSongArea() {
    song_area.value = "";
    for (var note of songList) {
        song_area.value += note.pitch + " " + note.length + " ";
    }
    
    song_title_box.value = songList.name;
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
    drawSongArea();
}

// callbacks
/**** Note Button callback  ***************************************************/
function note_button_callback(pitch) {
    songList.name = song_title_box.value;
    note_production_label.note = note;
    setProductionNotePitch(pitch);
}

/**** length set button callback  ***************************************************/
function length_slider_callback(value) {
    songList.name = song_title_box.value;
    setProductionNoteLength(value);
}

/*** populates the song_area elem ****/
// sends off to CommandStack
function confirm_button_callback(note) {
    songList.name = song_title_box.value;
    commandStack.execute(new NoteCommand(new Note(note.pitch, note.length), songList));
    drawSongArea();
    saveSong(songList);
}

/*** undo ****/
function undo_button_callback() {
    songList.name = song_title_box.value;
    commandStack.undo();
    drawSongArea();
    saveSong(songList);
}

/*** redo ****/
function redo_button_callback() {
    songList.name = song_title_box.value;
    commandStack.redo();
    drawSongArea();
    saveSong(songList);
}

function set_length_button_callback() {
    songList.name = song_title_box.value;
    if ( !(songList.notes.length == 0) ) {
        length = lengthSlider.value;
        note = songList.getBack();
        commandStack.execute(new SetLengthCommand(length, note, songList))
        drawSongArea();
        saveSong(songList);
    }
}

function clear_button_callback() {
    songList.name = song_title_box.value;
    commandStack.execute(new ClearCommand(songList));
    drawSongArea();
    saveSong(songList);
}

function save_button_callback() {
    songList.name = song_title_box.value;
    saveSong(songList);
    // make ajax request with song information to save_song.php
    $.ajax({    //create an ajax request to load_page.php
        type: "POST",
        dataType: "html",
        url: "save_song.php",
        async: false,
        data: {
            'name' : window.localStorage.songName,
            'notes' : window.localStorage.songNotes,
        },
        success: function(msg) {
            if(msg == "SUCCESS") {
                alert("save successful!");
            }
            else {
                $("#error_box")[0].innerHTML = "Error: " + msg;
            }
        }
    });
}