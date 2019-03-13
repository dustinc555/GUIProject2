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
 
// abstract class
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