// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. So, I can't cache your audio file.");
}

var db;
const dbName = "song_db";
var request = window.indexedDB.open("dbName, 3);


function addSong(song) {
   var request = db.transaction(["song"], "readwrite")
   .objectStore("employee")
   .add(song);
   
   request.onsuccess = function(event) {
      alert("Song added to db");
   };
   
   request.onerror = function(event) {
      alert("Unable to add song!");
   };
}

function read() {
   var transaction = db.transaction(["song"]);
   var objectStore = transaction.objectStore("song");
   var request = objectStore.get("00-03");
   
   request.onerror = function(event) {
      alert("Unable to retrieve daa from database!");
   };
   
   request.onsuccess = function(event) {
      
      if(request.result) {
         alert("Name: " + request.result.name + ", Age: 
            " + request.result.age + ", Email: " + request.result.email);
      } else {
         alert("Kenny couldn't be found in your database!");  
      }
   };
}



