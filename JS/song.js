/** JSON is not available on the school servers so we must handle formatting the data ourselves. 
*/

class Note {
    /**
    * Class represents a single note
    * a note has a string representing its pitch and a float representing its length (in seconds).
    */
  constructor(pitch="A5", length=.2) {
    this._pitch = pitch;
    this._length = length;
  }
  
  /**
   * Getter for pitch
   */
  get pitch() {
    return this._pitch; 
  }
  
  /**
   * Getter for length
   */
  get length() {
    return this._length; 
  }
  
  /**
   * Setter for pitch
   */
  set pitch(newP) {
    this._pitch = newP; 
  }
  
  
  /**
   * Setter for length
   */
  set length(newL) {
    this._length = newL; 
  }
}

/**
 *  Collection of available note pitches and their corresponding audio file on the server.
 * 'Pitch' -> 'location'
 *  All notes are 5 seconds long
 *  its play length can be adjusted to what the user specifies see playNote(note)
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
    /**
     * contains an array of notes however, Song itself is iterable and extends Array.
     * ex: for (var note of SongObj) {
     *       ...
     * }
    */
    constructor(notes = [], name = "none") {
        super();
        this._notes = notes;
        this._name = name;
    }
    
     /**
     * Adds note to underlying note array.
     * @param note see: note 
     */
    push(note) {
        this._notes.push(note);
    }
    
    /**
     * @returns note from underlying array.
     */
    get(index) {
        return this._notes[index];
    }
    
    /**
     * @returns and removes back note from notes array.
     */
    pop() {
        return this._notes.pop();
    }
    
    /**
     * @returns back from array
     */
    getBack() {
        return this._notes[this._notes.length - 1];
    }
    
    /**
     * @returns true if there are no notes, false otherwise
     */
    isEmpty() {
        return this._notes.length == 0;
    }
    
    // iterator for underlying notes array, this is how we can treat Song as an array object
    [Symbol.iterator]() { return this._notes.values() }
    
    /**
     * Setter for name.
     * @paramn name The name of the song.
     */
    set name(name) {
        this._name = name;
    }
    
    /**
     * Getter for name 
     */
    get name() {
        return this._name;
    }
    
    /**
     * Getter for underlying notes array 
     */
    get notes() {
        return this._notes;
    }
    
    /**
     * returns inner notes array length
     */
    length() {
        return this.notes.length;
    }
    
    
    /**
     * returns last element of inner notes array
     */
    back() {
        if (!(this.notes === undefined || this.length == 0)) {
            return this.notes[this.length() - 1];
        }
    }
}

// utility functions
/**
 * Plays a single note on the clients computer
*/
function playNote(note) {
    var p = note.pitch;
    var l = note.length;
    sound = new Audio(Note.pitchList[p]); // get the path to the note with the pitch
    sound.autoplay = false;
    sound.currentTime = parseFloat(Note.MAX_SONG_LENGTH - l);
    sound.play();
}


/**
 * Plays a song object, repeatedly calls playNote
*/
function playSong(song) {
    totalSeconds = 0.0;
    for (let note of song) {
        window.setTimeout( function() {
            playNote(note);
        }, totalSeconds * 1000 );
        totalSeconds += parseFloat(note.length);
    }
}