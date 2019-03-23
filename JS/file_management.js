/** 
 *  This file contains a set of callbacks for the buttons generated in file_management.php.
 *  @requires JQuery
 */


/**
 * Replaces the users local stored song with a song saved on the server.
 * @param filePath The path set to the callback by php in file_management.php
*/
function load_button_callback(filePath) {
    
    if (confirm("Are you sure? This will delete your current song if not saved!")) {
        $.get(filePath, function(data) {
            var name = getFileNameFromPath(filePath);
            var notes = data;
            
            window.localStorage.songNotes = notes;
            window.localStorage.songName = JSON.stringify(name);            
            
        }, 'text');
    } 
}

/**
 * Sends request to server to permanently delete the song.
 * @param filePath The path set to the callback by php in file_management.php
*/
function delete_button_callback(filePath) {
    if (confirm("Are you sure you wish to delete this song: " + getFileNameFromPath(filePath))) {
      
      $.ajax({    //create an ajax request to load_page.php
            type: "POST",
            dataType: "html",
            url: "delete_song.php",
            async: false,
            data: {
                'songPath' : filePath,
            },
            success: function(msg) {
                if(msg == "SUCCESS") {
                    // refresh page
                    location.reload();
                }
                else {
                    $("#error_box")[0].innerHTML = "Error: " + msg;
                }
            }
        });
      
    } else {
      txt = "You pressed Cancel!";
    }
} 

/**
 * Creates open file dialog for user to upload file to server.
*/
function upload_file_callback() {
    // check upload_file_button data
    // make ajax request to save_song.php
    var file_upload_button = document.getElementById("upload_file_button");
    var file = document.getElementById("upload_file_button").files[0];  
 
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var name = getFileNameFromPath(file_upload_button.value);
            var notes = evt.target.result;
            $.ajax({    //create an ajax request to load_page.php
                type: "POST",
                dataType: "html",
                url: "save_song.php",
                async: false,
                data: {
                    'name' : name,
                    'notes' : notes,
                },
                success: function(msg) {
                    if(msg == "SUCCESS") {
                        alert("save successful!");
                        location.reload();
                    }
                    else {
                        $("#error_box")[0].innerHTML = "Error: " + msg;
                    }
                }
            });
        }
            reader.onerror = function (evt) {
            alert("error reading file");
        }
    }
}

/**
 * Returns basename of file from file path.
 * @param filePath path to file
*/
function getFileNameFromPath(filePath) {
    filePath = filePath.substring(filePath.lastIndexOf('/')+1);
    return (filePath.substring(filePath.lastIndexOf('\\')+1)).split(".")[0];
}    
