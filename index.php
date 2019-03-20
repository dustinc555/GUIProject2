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
		<div id="note_bar">
		</div>

		<div id ="note_length">
			<p id="length_label">Note length (seconds):</p> 
            <button id="set_length_button" class="note_length_child">set</button>
            <input id="note_length_slider" class="slider" type="range" min=".1" max="5" step="0.1" value=".2">
		</div>	
		<div id="create_note">
			<button id="confirm_button">confirm note<div id="note_production_label"></div></button>
            <button id="play_note_button">play note</button>
		</div>
		<button id="undo_button">Undo</button>
		<button id="redo_button">Redo</button>
        <button id="clear_button">Clear</button>
        <button id="play_song_button">play song</button>
        <br/>
		<textarea id="song_area" readonly></textarea>
        <br/>
        <input id="song_title_box" type="text"></input>
        <button id="save_button">save</button>
        <p id="error_box"></p>
	</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="JS/storage.js"></script>
<script src="JS/song.js"></script>
<script src="JS/command.js"></script>
<script src="JS/index.js"></script>