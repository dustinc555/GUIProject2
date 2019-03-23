<?php
    /**This file receives a post request with a songs name and
    *   a songs json data and saves it to the server.
    *   @return SUCCESS if successful; otherwise, an error message.
    */

    // get song name and notes from post request
    $songName = $_POST['name'];
    $songName = str_replace('"', "", $songName);
    $songNotes = $_POST['notes'];
    
    // check if dir files exist
    if (!is_dir("files")) {
        mkdir("files", 766);
    }
    // check if number of files is less than 3
    $files = glob("files/*json");
    
    
    // if number of files with json extention is 3 or greater: return error
    if(count($files) >= 3) {
        echo "Max number of songs reached. Please delete a song to save to server. You can download the song before hand.";
    } else {
        // save notes to name.json
        $fileName = "files/" . basename($songName) . ".json";
        $myfile = fopen($fileName, "w");
        
        fwrite($myfile, $songNotes);
        fclose($myfile);
        echo "SUCCESS";
    }
?>
