<?php


    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    // get song name and notes from post request
    $songName = $_POST['name'];
    $songName = str_replace('"', "", $songName);
    $songNotes = $_POST['notes'];
    
    // check if dir files exist
    if (!is_dir("files")) {
        mkdir("files", 0755);
    }
    // check if number of files is less than 3
    $files = glob("files/*json");
    
    
    // if number of files with json extention is 3 or greater: return error
    if(count($files) >= 3) {
        echo "Max number of songs reached. Please delete a song to save to server. You can download the song before hand.";
    } else {
        // save notes to name.json
        $fileName = "files/" . $songName . ".json";
        $myfile = fopen($fileName, "w");
        
        fwrite($myfile, $songNotes);
        fclose($myfile);
        echo "SUCCESS";
    }
?>
