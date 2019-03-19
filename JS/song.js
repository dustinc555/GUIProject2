/** JSON is not available on the school servers so we must handle formatting the data ourselves. */

class Note {
  constructor(pitch, length) {
    this._pitch = pitch;
    this._length = length;
  }
  
  get pitch() {
    return this._pitch; 
  }
  
  
  get length() {
    return this._length; 
  }
  
  set pitch(newP) {
    this._pitch = newP; 
  }
  
  
  set length(newL) {
    this._length = newL; 
  }
  
  convertToXML() {
      return "<Note>";
  }
}

/* All notes are 5 seconds long
    its play length can be adjusted to what the user specifies see playNote(note)
*/
Note.pitchList = { 'A4' : 'res/notes/A4_440Hz_5s.wav',
         'B4' : 'res/notes/B4_493.88Hz_5s.wav',
         'C4' : 'res/notes/C4_261.63Hz_5s.wav', 
         'C5' : 'res/notes/C5_523.25Hz_5s.wav',
         'D4' : 'res/notes/D4_293.66Hz_5s.wav',
         'E4' : 'res/notes/E4_329.63Hz_5s.wav',
         'F4' : 'res/notes/F4_349.23Hz_5s.wav',
         'G4' : 'res/notes/G4_392Hz_5s.wav'};

Note.MAX_SONG_LENGTH = 5;


/** Collection class containing notes 
    Offers standard collection interface for an array
*/
class Song extends Array {
    constructor(notes = [], name = "none") {
        super();
        this._notes = notes;
        this._name = name;
    }
    
    push(note) {
        this._notes.push(note);
    }
    
    get(index) {
        return this._notes[index];
    }
    
    pop() {
        return this._notes.pop();
    }
    
    getBack() {
        return this._notes[this._notes.length - 1];
    }
    
    isEmpty() {
        return this._notes.length == 0;
    }
    
    // iterator for underlying notes array
    [Symbol.iterator]() { return this._notes.values() }
    
    convertToXML() {
      return "<Song>";
    }
    
    set name(name) {
        this._name = name;
    }
    
    get name() {
        return this._name;
    }
    
    get notes() {
        return this._notes;
    }
}

// utility functions
function playNote(note) {
    var p = note.pitch;
    var l = note.length;
    sound = new Audio(Note.pitchList[p]); // get the path to the note with the pitch
    sound.autoplay = false;
    sound.currentTime = parseFloat(Note.MAX_SONG_LENGTH - l);
    sound.play();
}


function playSong(song) {
    totalSeconds = 0.0;
    for (let note of song) {
        window.setTimeout( function() {
            playNote(note);
        }, totalSeconds * 1000 );
        totalSeconds += parseFloat(note.length);
    }
}