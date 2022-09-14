<!DOCTYPE HTML>
<html>
  <head>
    <title>
      Thanatopia
    </title>
    <meta http-equiv="Content-Type" />
	<meta content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<meta name="description" content="Thanatopia: A session with Madeline">
    <meta name="author" content="Robert Goodwin">
    <meta name="keywords" content="chatbot, game, interactive fiction, chat AI, chatscript" />

    <style type="text/css">
	  #responseHolderHolder {
        min-width: 300px;
        min-height: 263px;
        width: 80%;
        height: 263px;
        margin: 10px auto;
        background-color: #ffffff;
		background-color: #aaaabb;
		border: 1px;
		border-style: solid;
		border-color: black;
      }

      #responseHolder {
        min-width: 290px;
        min-height: 250px;
        height: 250px;
        overflow: auto;
        margin: 5px 5px;
		padding: 10px 20px;
        background-color: #eeeeff;
		background-color: #111122;
		border: 1px;
		border-style: solid;
		border-color: black;
      }


	.question {
		font-size: 14px;
		background-color: #444;
		color: white;
		padding: 10px;
		max-width: 650px;
		margin-top: 10px;
		
		border: 1px;
		border-style: solid;
		border-color: white;
	}

	.question:hover {
		cursor: pointer;
	}

	.question .glyphicon {
		float: right;
		
		-webkit-transition:all .4s;
		-moz-transition:all .4s;
		-o-transition:all .4s;
		-ms-transition:all .4s;
		transition:all .4s;
	}

	.flip {
	transform: rotate(-180deg);
	}

	.answer {
	font-size: 14px; 
		padding: 12px;
		display: none;
		max-width: 650px;
	}

	.answer li {
		padding-top: 10px;
	}

	.answer p {
		padding-top: 5px;
	}


	#whatisyourname {
    	color:white;
		font-size:16px;
	}

	#title {
		font-size:42px;
		font-family: horror, Arial, Helvetica, sans-serif;
		color:#eedddd;
	}

	#help {
		cursor:pointer; 
		color:#ccccee; 
		font-size:18px;
	}

	#theform {
		margin-top:20px;
		margin-left:10px;
		margin-right:10px;
		padding-left:25px;
		padding-right:25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inputField {
		margin-bottom:10px;
		display:inline-block;
    	padding:7px 10px;
    	line-height: 16px;
		font-size: 18px;
		margin-left:5px;
		margin-right:5px;

	}

	.inputSubmit {
		display:inline-block;
    	padding:7px 9px;
    	line-height: 16px;
		font-size: 18px;
		margin-left:5px;
		margin-right:5px;
	}

	#image-div {
		margin-bottom:18px;
	}

	#spacing {
		display: None;
	}

	#inputDiv {
		width: 640px;
		max-width: 95%;
		background-color:yellow;
	}

	#txtMessage {
		width: 82%;
	}


	
	@media screen and (max-width: 1080px) {
		/*#txtMessage {
			size: 20;
		}*/

		/*responseHolder {
			height: 180px;
		}*/

		#responseHolderHolder {
			margin-bottom: 0px;
			width: 100%;
			max-width: 650px;
		}

		#title {
			font-size: 40px;
		}

		#whatisyourname {
			font-size: 16x;
		}
		
		#help {
			font-size: 18px;
		}

		#theform {
			margin-top: 6px;
		}

		#image-div {
			margin-bottom:8px;
		}

		#spacing {
			display: block;
			margin-bottom: 10px;
		}

		#inputDiv {
			width: 350px;
		}

		#txtMessage {
			width: 98%;
		}
	}


    </style>

	<link href="css/bootstrap.min.css" rel="stylesheet"> 
	<link href="css/common.css" rel="stylesheet">
	

  </head>
  <body role="document" id="bootstrap-override" style="background-image: url('imgs/fancy-pants.jpg');">
  	<div style="position:relative;" class="normal-top">       
            <!--<div class="text-center">
                    <p>
                        <a href="https://robertgoodwin00.github.io/where-one-citizen/index.html" style="color:white;">
                            Games by Robert Goodwin
                        </a>

                    </p>
            </div>-->         
    </div>
 

	<div id="main-container" role="main" style="background-color:#222233;">

		<div id="image-div" class="row">

	  		<br><br>

			<div id="subheading" class="text-center">
				<span id="title">Thanatophobia</span>
				<h6 style="font-family: Helvetica, Verdana, sans-serif; font-style:italic; color:#eedddd;">A session with Madeline</h6>
			</div>

	  		<br><br><br>

			<div id="back1" style="position:relative; margin:auto; max-width:650px; border:1px; border-style:groove; border-color:#aaaaaa;" >
				<img src="imgs/pound_dark.jpg" width=100% />
			</div>

			<div id="back2" style="display:None; position:relative; margin:auto; max-width:650px; border:1px; border-style:groove; border-color:#aaaaaa;" >
				<!--<img src="imgs/hallway_blue_medium.jpg" width=100% />-->
				<img src="imgs/midjourney_hall.jpg" width=100% />
			</div>

			<div id="back3" style="display:None; position:relative; margin:auto; max-width:650px; border:1px; border-style:groove; border-color:#aaaaaa;" >
				<img src="imgs/overdose.jpg" width=100% />
			</div>

			<div id="back4" style="display:None; position:relative; margin:auto; max-width:650px; border:1px; border-style:groove; border-color:#aaaaaa;" >
				<img src="imgs/officeway.jpg" width=100% />
			</div>
		</div>



		<script>
		// A function that hides or shows a selected element
		function hideAndShow() {
			for (const item of document.getElementsByClassName("tohide")) {
				item.style.display = "none";
			}

			for (const item of document.getElementsByClassName("toshow")) {
				item.style.display = "block";
			}
  		}

		function hideOrShow() {
			var item = document.getElementById("about");
			if (item.style.display=="none") {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
  		}

		function hideOrShowHints() {
			var item = document.getElementById("hints");
			if (item.style.display=="none") {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
  		}

		  function hideOrShowHowSmart() {
			var item = document.getElementById("howsmart");
			if (item.style.display=="none") {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
  		}

		function hideOrShowPrivacy() {
			var item = document.getElementById("privacy");
			if (item.style.display=="none") {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
  		}

		
		</script>


		<div class="toshow" id="responseHolderHolder" style="display:None;">
			<div id="responseHolder"></div> 
		</div>


		<div id="theform">
			<form id="frmChat" action="#">
			
			<div style="display:flex; align-items:right; justify-content:right; margin-top:14px; margin-bottom:10px;" class="tohide">
	  			<div>
					<span id="whatisyourname">What is your name?</span> &nbsp;
					
					<div id="spacing"></div>

					<!--<label for="txtUser" id="whatisyourname">What is yoru name</label> &nbsp;-->
					<span style="color:black;">
						<input type="text" class="inputField" id="txtUser" name="user" size="10" value="" autofocus />
					</span>

					<input type="hidden" name="send" />
					&nbsp;
					<!--<a style="cursor: pointer;" onclick="hideAndShow();">BEGIN</a>-->
					
					<span style="color:black; ">
						<input type="submit" name="send" value="BEGIN" class="inputSubmit" onclick="hideAndShow();" />
					</span>

				</div>
			</div>


			<div class="toshow" style="display:None; margin-left:10px; margin-right:10px;">
				<div style="display:flex; align-items:center; justify-content:center;">
					
					<div id="inputDiv">
						<span>
							<input type="text" name="message" class="inputField" id="txtMessage"  />

				<!--<table>
				<tr>
					<td>Your name:</td>
					<td>
					<input type="text" id="txtUser" name="user" size="10" value="" />
					<input type="hidden" name="send" />
					</td>
				</tr>

				<tr>
					<td>Chat: &nbsp;</td>
					<td><input type="text" name="message" id="txtMessage" size="40" /></td>
				</tr>
				<tr>
					<td colspan="2"><input type="submit" name="send" value="Send Value" /></td>
				</tr>
				</table>-->
							&nbsp;
							<input type="submit" name="send" value="Say it" class="inputSubmit" />
						</span>
					</div>
				</div>
			</div>
			

			</form>
		</div>

		

	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript">


	$(document).ready(function(){
		
		$(".question").click( function() {
			var answer = $(this).next();
			var glyph = $(this).children("span.glyphicon");

			glyph.toggleClass('flip');  
			
			if (answer.css("display") == "none") {
				answer.slideDown();
			} else {
				answer.slideUp();

			}
		});
	});


	var botName = 'Madeline';		// change this to your bot name
	var did_first_volley = false;  // so that name entry doesn't display user volley
	var currentImg = 1;
	var newImg = 1;

	// declare timer variables
	var alarm = null;
	var callback = null;
	var loopback = null;

	$(function(){
		$('#frmChat').submit(function(e){
		// this function overrides the form's submit() method, allowing us to use AJAX calls to communicate with the ChatScript server
		e.preventDefault();  // Prevent the default submit() method
		var name = $('#txtUser').val();
		if (name == '') {
			alert('Please provide your name.');
			document.getElementById('txtUser').focus();
		}
		var chatLog = $('#responseHolder').html();
		//var youSaid = '<strong>' + name + ':</strong> ' + $('#txtMessage').val() + "<br>\n";
		var youSaid = '<div style="text-align:right;"><span style="color:#bbbbbb;"><strong>' + name + '</strong></span><span style="color:azure;"><strong>:</strong> ' + $('#txtMessage').val() + "</span></div><br>\n";
		
		if ($('#txtMessage').val() == ":reset") {
			document.getElementById("back1").style.display = "None";
			document.getElementById("back2").style.display = "block";
			document.getElementById("back3").style.display = "None";
			document.getElementById("back4").style.display = "None";
			document.getElementById("checkmark1").style.display = "None";
			document.getElementById("checkmark2").style.display = "None";
			document.getElementById("checkmark3").style.display = "None";
			botName = "Madeline";
			update('<br>\n');
		}
		else if (!did_first_volley) {
			did_first_volley = true;
			document.getElementById("back1").style.display = "None";
			document.getElementById("back2").style.display = "block";
			document.getElementById("back2").focus();
		} else 
			update(youSaid);
			var data = $(this).serialize();
			sendMessage(data);
			$('#txtMessage').val('').focus();
		});

		// any user typing cancels loopback or callback for this round 
		$('#txtMessage').keypress(function(){
			window.clearInterval(loopback);
			window.clearTimeout(callback);
			});
			
	});
	
	function sendMessage(data){ //Sends inputs to the ChatScript server, and returns the response-  data - a JSON string of input information
	$.ajax({
		url: 'ui.php',
		dataType: 'text',
		data: data,
		type: 'post',
		success: function(response){
			processResponse(parseUsername(parseCommands(response)));
		},
		error: function(xhr, status, error){
			alert("No response from server. The server may be down, or you may not be online, or communication between the server has otherwise failed.");
			// Status = ' + status + ', error message = ' + error + "\nResponse = " + xhr.responseText);
		}
	});
	}

	function parseUsername(response){
		var user = $('#txtUser').val();
		var parts = response.split('---');
		if (parts.length==1) {
			return response;  // split divider doesn't appear in string
		} else if (parts.length>1 && parts[1].length>=4) {
			// trim off the first four chars (the ip address)
			var len = parts[1].length;
			newp = parts[1].slice(4,len);
			return parts[0] + newp;
		}
		return response;
	}

	function parseCommands(response){ // Response is data from CS server. This processes OOB commands sent from the CS server returning the remaining response w/o oob commands
		console.log(response);
		var len  = response.length;
		var i = -1;
		while (++i < len )
		{
			if (response.charAt(i) == ' ' || response.charAt(i) == '\t') continue; // starting whitespace
			if (response.charAt(i) == '[') break;	// we have an oob starter
			return response;						// there is no oob data 
		}
		if ( i == len) return response; // no starter found
		var user = $('#txtUser').val();
		
		// walk string to find oob data and when ended return rest of string
		var start = 0;
		while (++i < len )
		{
			if (response.charAt(i) == ' ' || response.charAt(i) == ']') // separation
			{
				if (start != 0) // new oob chunk
				{
					var blob = response.slice(start,i);
					start = 0;

					var commandArr = blob.split('=');
					if (commandArr.length == 1) continue;	// failed to split left=right

					var command = commandArr[0]; // left side is command 
					var interval = (commandArr.length > 1) ? commandArr[1].trim() : -1; // right side is millisecond count
					if (interval == 0)  /* abort timeout item */
					{
						switch (command){
							case 'alarm':
								window.clearTimeout(alarm);
								alarm = null;
								break;
							case 'callback':
								window.clearTimeout(callback);
								callback = null;
								break;
							case 'loopback':
								window.clearInterval(loopback);
								loopback = null;
								break;
						}
					}
					else if (interval == -1) interval = -1; // do nothing
					else
					{
						var timeoutmsg = {user: user, send: true, message: '[' + command + ' ]'}; // send naked command if timer goes off 
						switch (command) {
							case 'alarm':
								alarm = setTimeout(function(){sendMessage(timeoutmsg );}, interval);
								break;
							case 'callback':
								callback = setTimeout(function(){sendMessage(timeoutmsg );}, interval);
								break;
							case 'loopback':
								loopback = setInterval(function(){sendMessage(timeoutmsg );}, interval);
								break;
							case 'cm': // checkmark
								// console.log("checkmark=" + interval);
								if (interval==1) // has seen figure's blue lips
									document.getElementById("checkmark1").style.display = "inline";
								else if (interval==2) // knows about kim's blue lips
									document.getElementById("checkmark2").style.display = "inline";
								else if (interval==3) { // seen/knows about both blue lips
									document.getElementById("checkmark1").style.display = "inline";
									document.getElementById("checkmark2").style.display = "inline";
								}
								else if (interval==4) { // run towards figure
									document.getElementById("checkmark1").style.display = "inline";
									document.getElementById("checkmark2").style.display = "inline";
									document.getElementById("checkmark3").style.display = "inline";
								}
								else {  // clear all
									document.getElementById("checkmark1").style.display = "None";
									document.getElementById("checkmark2").style.display = "None";
									document.getElementById("checkmark3").style.display = "None";
								}
								break;
							case 'sys':
								if (interval==1)
									botName = "";
								break;
							case 'img':
								newImg = interval + 1;
								if (interval==1) {    // hall
									document.getElementById("back2").style.display = "block";
									document.getElementById("back3").style.display = "None";
									document.getElementById("back4").style.display = "None";
								} 
								else if (interval==2) {   // corpse
									document.getElementById("back2").style.display = "None";
									document.getElementById("back3").style.display = "block";
									document.getElementById("back4").style.display = "None";
								} 
								else if (interval==3) {   // office
									document.getElementById("back2").style.display = "None";
									document.getElementById("back3").style.display = "None";
									document.getElementById("back4").style.display = "block";
								} 
								break;

						}
					}
				} // end new oob chunk
				if (response.charAt(i) == ']') return response.slice(i + 2); // return rest of string, skipping over space after ] 
			} // end if
			else if (start == 0) start = i;	// begin new text blob
		} // end while
		return response;	// should never get here
	}
	
	function update(text){ // text is  HTML code to append to the 'chat log' div. This appends the input text to the response div
		var chatLog = $('#responseHolder').html();
		$('#responseHolder').html(chatLog + text);
		var rhd = $('#responseHolder');
		var h = rhd.get(0).scrollHeight;
		rhd.scrollTop(h);

		// focus on the img if it changed from what it was before. doesn't work!
		if (currentImg != newImg) {
			currentImg = newImg;
			document.getElementById("responseHolder").focus();
		}
	}

	function processResponse(response) { // given the final CS text, converts the parsed response from the CS server into HTML code for adding to the response holder div
		//var botSaid = '<strong>' + botName + ':</strong> ' + response + "<br>\n";
		if (botName == "")
			var botSaid = '<span style="color:azure;">' + response + "</span><br>\n";
		else 
			var botSaid = '<span style="color:brown;"><strong>' + botName + '</strong></span><span style="color:azure;"><strong>:</strong> ' + response + "</span><br>\n";
		update(botSaid);
	}

	</script>


	<br><br>

	<div style="color:green; font-weight:bold; font-size:20px; margin:5px 25px;" class="text-center">
		<span id="checkmark1" style="display:None;">✓</span>  
		<span id="checkmark2" style="display:None;">✓</span>
		<span id="checkmark3" style="display:None;">✓</span>
	</div>

	<br>

	<div class="text-center">
		<a onclick="hideOrShow();" id="help">HELP</a>
	</div>

	<div id="about" style="display:None; margin:15px 30px; align-items:center; justify-content:center;">
		<div style="max-width:650px; color:white;">
			<p>
			To help Madeline you must discover 2 Details and perform 1 Action. (more precisely, have Madeline perform 1 Action)
			<p>
			The 2 Details are related but must be discovered separately. 
			<p>
			The 1 Action becomes available after you have discovered the 2 Details.
			<p>
			A green checkmark is displayed directly above here for each Detail and Action accomplished, to indicate your progress.
			<!--<p>
			The chat can be restarted from the beginning by typing ":reset"-->
			<br><br><br>

			<div class="text-center">
				<a onclick="hideOrShowHints();" style="cursor:pointer; color:#ccccee; font-size:16px;">I need a hint</a>
			</div>


			<div id="hints" style="display:None; margin:15px 30px; align-items:center; justify-content:center;">
				<div class="question">
                    Help finding the 1st Detail
                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                </div>
                            
                <div class="answer">
                    The first Detail is something that Madeline sees <span style="font-weight:bold;">now</span>.
                </div>

				<div class="question">
                    Help finding the 2nd Detail
                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                </div>
                            
                <div class="answer">
                    The second Detail is something that Madeline saw in her <span style="font-weight:bold;">past</span>. 
					It may take some probing to discover the right clue.
                </div>

				<div class="question">
                    Help finding the Action
                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                </div>
                            
                <div class="answer">
                    Once you have found the two Details, Madeline will ask you about how they are connected.
					Your answers will reveal who the hooded figure is.
					<br><br>
					Finally, tell Madeline what she must do to escape from the hallway, thus ending the visualization.
                </div>

			</div>
		</div>

	</div>

	<br><br><br><br>

	<div style="fontsize:10px; color:#aaaaaa; margin-bottom:8px;" class="text-center">
		(if Madeline does not respond, the server may be down. Please try again later.)
	</div>

	<br><br><br><br>

	<div style="fontsize:12px; color:#dddddd; margin-bottom:8px;" class="text-center">
		Thanatophobia is a game/chatbot by Robert Goodwin written in <a style="color:#8888ff;" href="https://github.com/ChatScript/ChatScript">Chatscript</a>.
		<br>Photo by Kenny Eliason. Art by <a href="https://www.midjourney.com/home/">Midjourney</a>. Tested by Mike Russo. Copyright 2022.
	</div>

	<div class="text-center">
		<a onclick="hideOrShowPrivacy();" style="cursor:pointer; color:#ccccee; font-size:12px;">Privacy Policy</a>
	</div>

	<div id="privacy" style="display:None; margin:15px 30px; align-items:center; justify-content:center; font-size:12px;">
		<div style="max-width:650px; color:white;">
			<p>
			This experiment game/chatbot exists for entertainment.
			Your chat history is stored on the server in order to improve the game.
			It is never shared with third parties.
			<p>
			The chatbot will never ask for sensitive personal information such as credit card numbers or phone numbers and you should never share such information. 
			As the game consists mostly of asking the chatbot questions, you never need to.
			Enjoy the game!
		</div>

	</div>

	<br><br>

	<div class="text-center">
		<a onclick="hideOrShowHowSmart();" style="cursor:pointer; color:#ccccee; font-size:12px;">How smart is Madeline?</a>
	</div>

	<div id="howsmart" style="display:None; font-size:12px; margin:15px 30px; align-items:center; justify-content:center;">
			<div style="max-width:650px; color:white;">
				<p>
				Madeline has faculties beyond what are needed to complete the objective.
				She can perform basic arithmetic (e.g. "What's 6 x 7?"), learn simple facts taught to her (e.g. "My car is new."), and has an extensive dictionary and knowledge about the world.
				She can answer basic questions about the world (e.g. "Is a snake a mammal?", "Can you eat a boulder?", "Is Brad Pitt an actor?") albeit imperfectly.
				As with any AI, if you want to prove that Madeline is less intelligent than a human, it's not hard to do so.
			</div>
	</div>


	<br><br><br>

	</div>



	<footer> 
        <div class="container-fluid foot">
            <div class="text-center" >
                Copyright © 2022, Robert Goodwin
            </div> 
        </div>
    </footer>

</body>
</html>
