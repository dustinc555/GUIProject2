<?php
     /** Attempts to remove file from servers files folder.
      */
    // there is no php undo for deleteing a file
    // once its done its done, lets burn some files to the ground!
    // it may be a potential security issue to attempt to delete any input file.
    // TODO: Make an input validator function 
    $myFileName = $_POST['songPath'];
    unlink('files/' . $myFileName) or die("Couldn't delete file");
    echo "SUCCESS";
?>