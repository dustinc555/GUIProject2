


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


function getFileNameFromPath(filePath) {
    return filePath.split("/").pop().split(".")[0];
}    