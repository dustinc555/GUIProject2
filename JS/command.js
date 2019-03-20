// REBENITSCH: COMMAND

class CommandStack {
    
   constructor() {
      this.commandStack = [];
      this.redoStack = [];
   }

   execute(command) {
      command.execute();
      this.commandStack.push(command);
      this.redoStack = [];
      
   }

   undo() {
      if (this.commandStack.length == 0)
         return;
      var command = this.commandStack.pop();
      command.undo();
      this.redoStack.push(command);
   }

   redo() {
      if (this.redoStack.length == 0)
         return;
      var command = this.redoStack.pop();
      command.redo();
      this.commandStack.push(command);
   }
}
 
/** abstract class
* in order to make a new command, extend this class and implement the methods
* execute, undo, and redo
*/

class Command {
    
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

class SetLengthCommand extends Command {
    constructor(length, note, songList) {
        super();
        this.length = length;
        this.prevLength = note.length;
        this.songList = songList;
    }
    
    execute() {
        songList.getBack().length = this.length;
    }
    
    undo() {
        songList.getBack().length = this.prevLength;
    }
    
    redo() {
        this.execute();
    }
}

class ClearCommand extends Command {
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