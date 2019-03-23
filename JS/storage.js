/** This files purpose is to provide functions to interact with the clients local storage.
 *
*/

/// the users local storage object. Anything saved to this will remain when the user returns to the site. 
var _localStorage = window.localStorage;


/**
 * Called by index.js, initializes song to users local storage.
 */
function checkUserStorage() {
    if (isAvailable()) {
        if (_localStorage.songNotes || _localStorage.songName) {
          return getSong();
        } else {
          s = new Song();
          saveSong(s);
          return s;
        }
    } else {
        alert('Sorry! No Web Storage support..');
    }
}


/** returns true if the users browser has localStorage */
function isAvailable() {
    return typeof(Storage) !== "undefined";
}

/** 
*   saves the song the user is currently working on
*   Since we want the user to be able to continue their working
*   without worry of their internet going out, we use localStorage 
*   instead of sessionStorage */
function saveSong(song) {
    if (isAvailable()) {
        _localStorage.songName = JSON.stringify(song.name);
        _localStorage.songNotes = JSON.stringify(song.notes);
    }
}


/** 
 * returns song object from local storage
 * see: song.js for class definition 
*/
function getSong() {
    if (isAvailable()) {
        name = JSON.parse(this._localStorage.songName);
        notes = JSON.parse(this._localStorage.songNotes);
        
        // song has to be reconstructed since JSON only stores string
        initNotes = [];
        notes.forEach(function(i) { 
            initNotes.push(new Note(i._pitch, i._length));
        });
        return new Song(initNotes, name);
    }
}

function getSongFromJSON() {
    name = JSON.parse(this._localStorage.songName);
    notes = JSON.parse(this._localStorage.songNotes);
    
    // song has to be reconstructed since JSON only stores string
    initNotes = [];
    notes.forEach(function(i) { 
        initNotes.push(new Note(i._pitch, i._length));
    });
    return new Song(initNotes, name);
}


