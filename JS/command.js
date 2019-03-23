// REBENITSCH: COMMAND

class CommandStack {
   /**
    * This class is used to implement the UNDO/REDO pattern.
    * @property commandStack List of commands the user has currently executed.
    * @property redoStack List of commands the user has undone, is cleared when a new command is executed.    
    */
    
   /**
    * starts with empty command stack and empty redo stack
    * 
    */
   constructor() {
      this.commandStack = [];
      this.redoStack = [];
   }

   /**
    * Calls commands execute, pushes it to commandStack and clears redoStack. 
    */
   execute(command) {
      command.execute();
      this.commandStack.push(command);
      this.redoStack = [];
      
   }

    /**
     * Calls last executed commands undo and pushes it to redoStack.
     */
   undo() {
      if (this.commandStack.length == 0)
         return;
      var command = this.commandStack.pop();
      command.undo();
      this.redoStack.push(command);
   }

    /**
     * calls redo on last undone command pushed to redoStack.
     */
   redo() {
      if (this.redoStack.length == 0)
         return;
      var command = this.redoStack.pop();
      command.redo();
      this.commandStack.push(command);
   }
}
 
class Command {
    /** abstract class
     * in order to make a new command, extend this class and implement the methods
     * execute, undo, and redo. If these methods are not implemented an error will be thrown.
     */
    constructor() {
        if (this.constructor === Command) {
            throw new TypeError('Abstract class "Command" cannot be instantiated directly.'); 
        }
        
        if (this.execute === undefined) {
            throw new TypeError('execute method must be implemented for class extending Command.');
        }
        
        if (this.undo === undefined) {
            throw new TypeError('undo method must be implemented for class extending Command.');
        }
        
        if (this.redo === undefined) {
            throw new TypeError('redo method must be implemented for class extending Command.');
        }
    }
}


class NoteCommand extends Command {
    /**
     * Command that adds note to a song.
     * @extends Command
     */
    constructor(note, songList) {
        super();
        this.note = note;
        this.songList = songList;
    }
    
    execute() {
        // push our note to the song list
        this.songList.push(this.note);
    }
    
    undo() {
        // pop our note from the song list
        this.songList.pop();
    }
    
    redo() {
        // push our note to the song list
        // in our case its the same as execute
        this.execute();
    }
}

class SetNoteCommand extends Command {
    /**
     * Command that alters the last note in the given song array.
     * @extends Command
     */
    constructor(newNote, songList) {
        super();
        this.newNote = newNote;
        this.prevNote = songList.notes[songList.notes.length - 1];
        this.songList = songList;
    }
    
    execute() {
        this.songList.notes[this.songList.notes.length - 1] = this.newNote;
    }
    
    undo() {
            this.songList.notes[this.songList.notes.length - 1] = this.prevNote;
    }
    
    redo() {
        this.execute();
    }
}

class ClearCommand extends Command {
    /**
     * Command that clears a song
     * @extends Command
     */
     
    constructor(songList) {
        super();
        this.prevSongList = songList;
    }
    
    execute() {
        songList = new Song([], songList.name);
    }
    
    undo() {
        songList = this.prevSongList;
    }
    
    redo() {
        this.execute();
    }
}