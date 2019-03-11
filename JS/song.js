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


Note.pitchList = ["C", "D", "E", "F", "G", "A", "B", "C"];


