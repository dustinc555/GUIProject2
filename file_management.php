<!DOCTYPE html>
<html>
	<head> 
		<title>Web Song</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="main.css" media="screen" />
	</head>
	

	<body>
		<nav id="menu">
			<ul class="navList">
				<li class="menu_item"><a href="index.php">Main Page</a></li>
				<li class="menu_item"><a href="file_management.php">Files</a></li> 
				<li class="menu_item"><a href="help.html">Help</a></li>
			</ul>
		</nav>
        
        <ul id="file_list">
            <?php
            $files = glob("files/*json");

            if (is_array($files)) {

                 foreach($files as $filename) {
                    $xml_file = file_get_contents($filename, FILE_TEXT);
                    $fileSize = filesize($filename);
                    $liNode = '<li class="file_list_child">';
                    $liNode .= '<a href="' . $filename . '">' . basename($filename) . '</a>';
                    $liNode .= '<a href="' . $filename . '" download> Download </a>';
                    $liNode .= '<a onclick="load_button_callback(\'' . $filename . '\')" id="load_button"> Load to editor </a>';
                    $liNode .= '<a onclick="delete_button_callback(\'' . $filename . '\')" id="delete_button""> Delete </a>';
                    $liNode .= '<span>' . $fileSize . ' bytes </span>';
                    $liNode .= '</li>';
                    echo $liNode;
                 }
            }
            ?>
        </ul>
	</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="JS/file_management.js"></script>

