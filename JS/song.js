class Note {
  constructor(pitch, length) {
    this.internal_pitch = pitch;
    this.internal_length = length;
  }
  
  get pitch() {
    return this.internal_pitch; 
  }
  
  
  get length() {
    return this.internal_length; 
  }
  
  set pitch(newP) {
    this.internal_pitch = newP; 
  }
  
  
  set length(newL) {
    this.internal_length = newL; 
  }
}


Note.pitchList = { 'A4' : 'res/notes/A4_440Hz_5s.wav',
         'B4' : 'res/notes/B4_493.88Hz_5s.wav',
         'C4' : 'res/notes/C4_261.63Hz_5s.wav', 
         'C5' : 'res/notes/C5_523.25Hz_5s.wav',
         'D4' : 'res/notes/D4_293.66Hz_5s.wav',
         'E4' : 'res/notes/E4_329.63Hz_5s.wav',
         'F4' : 'res/notes/F4_349.23Hz_5s.wav',
         'G4' : 'res/notes/G4_392Hz_5s.wav'};

Note.MAX_SONG_LENGTH = 5;

function playNote(note) {
    var p = note.pitch;
    var l = note.length;
    sound = new Audio(Note.pitchList[p]); // get the path to the note with the pitch
    sound.autoplay = false;
    sound.currentTime = parseFloat(Note.MAX_SONG_LENGTH - l);
    sound.play(); 
}
