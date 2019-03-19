<?php
    // there is no php undo for deleteing a file
    // once its done its done, lets burn some files to the ground!
    $myFile = $_POST['songPath'];
    unlink($myFile) or die("Couldn't delete file");
    echo "SUCCESS";
?>